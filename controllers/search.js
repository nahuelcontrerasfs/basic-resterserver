const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const {
    Category,
    Product,
    User
} = require('../models')

const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users'
];

const searchCategories = async( searchTerm = '', res = response) => {
    
    const isValidMongoID = ObjectId.isValid( searchTerm );

    if(isValidMongoID) {
        const category = await Category.findById(searchTerm);
        return res.json({
            results: (category) ? [ category ] : []
        });
    }

    const regex = new RegExp( searchTerm, 'i')
    const categories = await Category.find({ name: regex, status: true });
    return res.json({
        results: categories
    });
}

const searchProducts = async( searchTerm = '', res = response) => {
    
    const isValidMongoID = ObjectId.isValid( searchTerm );

    if(isValidMongoID) {
        const product = await Product.findById(searchTerm)
                                     .populate('category','name');
        return res.json({
            results: (product) ? [ product ] : []
        });
    }

    const regex = new RegExp( searchTerm, 'i')
    const products = await Product.find({ name: regex, status: true })
                                  .populate('category','name');
    return res.json({
        results: products
    });
}


const searchUsers = async( searchTerm = '', res = response) => {
    
    const isValidMongoID = ObjectId.isValid( searchTerm );

    if(isValidMongoID) {
        const user = await User.findById(searchTerm);
        return res.json({
            results: (user) ? [ user ] : []
        });
    }

    const regex = new RegExp( searchTerm, 'i')
    const users = await User.find({
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [
            { status: true }
        ]
    });
    return res.json({
        results: users
    });
}

const search = (req, res = response) => {
    
    const { searchCollection, searchTerm } = req.params;
    
    if(!allowedCollections.includes(searchCollection)) {
        return res.status(400).json({
            msg: `${searchCollection} no es una colección reconocida. Las colecciones permitidas con: ${allowedCollections}`
        });
    }
    
    switch (searchCollection) {
        case 'categories':
            searchCategories(searchTerm, res);
            break;
        case 'products':
            searchProducts(searchTerm, res);
            break;
        case 'users':
            searchUsers(searchTerm, res);
            break;
        default:
            res.status(500).json({
                msg: 'search not defined yet'
            })
            break;
    }
}

module.exports = {
    search
}