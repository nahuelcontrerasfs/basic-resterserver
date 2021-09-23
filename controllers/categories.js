const { response } = require('express');
const { Category } = require('../models');

// PAGINADO - TOTAL - POPULATE
const getCategories = async (req, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    
    const query = { status: true };
    
    const [ categories, total] = await Promise.all([
        Category.find( query )
                .populate('user', 'name')
                .skip(Number(from))
                .limit(Number(limit)),
        Category.countDocuments( query )
    ]);
    res.json({
        categories,
        total
    });
}

// POPULATE
const getCategory = async (req, res = response) => {
    const { id } = req.params    
    const category = await Category.findById( id, {
        status: false
    })
    .populate('user', 'name');        
    res.json( category );
}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });
    if(categoryDB) {
        return res.status(400).json({
            msg: `La categoría ${categoryDB.name}, ya existe`
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );
    await category.save();

    res.status(201).json(category);
}

const updateCategory  = async (req, res = response) => {
    
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});
    res.json(category);
}

// ESTADO A FALSE
const deleteCategory  = async (req, res = response) => {
    const { id } = req.params    
    const category = await Category.findByIdAndUpdate( id, { status: false }, { new: true });        
    res.status(200).json( category );
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}