const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { uploadFile } = require('../helpers');
const { 
    User, 
    Product 
} = require('../models');

const uploadImage = async ( req, res = response ) => {
    
    try {
        
        const name = await uploadFile( req.files, undefined, 'img' );
        res.json({ name });
        
    } catch (msg) {                
        res.status(400).json({ msg });
    }        
}

const updateImage = async ( req, res = response ) => {
    
    const { searchCollection, id } = req.params;
    let model;
    
    switch ( searchCollection ) {
        
        case 'users':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            }
            break;
        
        case 'products':
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe producto con el id ${id}`
                });
            }
            break;
        
        default:
            return res.status(500).json({
                msg: 'Falta validar'
            });
        
        }
                
    if(model.image) {
        const pathImage = path.join( __dirname, '../uploads', searchCollection, model.image );
        if(fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }        

    const name = await uploadFile( req.files, undefined, searchCollection );
    model.image = name;
    await model.save();
    res.json(model);
}

const updateImageCloudinary = async ( req, res = response ) => {
    
    const { searchCollection, id } = req.params;
    let model;
    
    switch ( searchCollection ) {
        
        case 'users':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            }
            break;
        
        case 'products':
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe producto con el id ${id}`
                });
            }
            break;
        
        default:
            return res.status(500).json({
                msg: 'Falta validar'
            });
        
        }
                
    if(model.image) {
        const arrayName = model.image.split('/');
        const name = arrayName[ arrayName.length - 1 ];
        const [ publicId ] = name.split('.');
        cloudinary.uploader.destroy(publicId);
    }       
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.image = secure_url;

    await model.save();
    res.json(model);
}

const showImage = async(req, res = response) => {
    const { searchCollection, id } = req.params;
    let model;
    
    switch ( searchCollection ) {
        
        case 'users':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            }
            break;
        
        case 'products':
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe producto con el id ${id}`
                });
            }
            break;
        
        default:
            return res.status(500).json({
                msg: 'Falta validar'
            });
        
        }
                
    if(model.image) {
        const pathImage = path.join( __dirname, '../uploads', searchCollection, model.image );
        if(fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }
    
    const pathImage = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile(pathImage)
}

module.exports = {
    uploadImage,
    updateImage,
    updateImageCloudinary,
    showImage
}