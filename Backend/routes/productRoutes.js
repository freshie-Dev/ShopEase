const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer to handle FormData with disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Add a unique suffix to avoid filename conflicts
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Set the filename to include the original filename extension
    }
});
const upload = multer({ storage: storage });

//Local Imports
const { Product } = require('../DB.js'); // Product Schema
const { verifyToken } = require('../middleware/middleware.js'); // Middleware functions

//! POST A NEW PRODUCT add product
router.post('/postproduct', upload.single('original_product_image'), verifyToken, async (req, res) => {

    const { userId, title, price, description, product_image, image_filename, attributes, categories, customizable, isRemoveBgChecked } = req.body;
    try {
        if (customizable === "true") {
            const parsedCategories = JSON.parse(categories);
            const newProduct = new Product({
                userId,
                title,
                price,
                description,
                customizable,
                categories: parsedCategories,
            });

            const savedProduct = await newProduct.save();
            return res.status(201).json({ success: true, message: "Product added successfully", savedProduct });
        } else {
            // Ensure that the file is uploaded
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }

            // Validate incoming data
            if (!title || !price || !description || !product_image || !attributes || !categories) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            const parsedAttributes = JSON.parse(attributes);
            const parsedCategories = JSON.parse(categories);

            // imageUrl = isRemoveBgChecked === "true" ? product_image : ("http://localhost:3001/" + req.file.path.replace(/\\/g, '/'));


            const newProduct = new Product({
                userId,
                title,
                price,
                description,
                imageUrl: product_image,
                uniqueIdentifier: image_filename,
                attributes: parsedAttributes,
                categories: parsedCategories,
                customizable,
                savedBackendImage: "localhost:3001/" + req.file.path, // Save the path of the uploaded file
                savedBackendImageName: req.file.filename
            });

            const savedProduct = await newProduct.save();
            console.log('Product saved:', savedProduct);
            return res.status(201).json({ success: true, message: "Product added successfully" });
        }

    } catch (error) {
        console.error('Error saving product:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



//! FETCH ALL PRODUCTS all products
router.route('/all')
    .get(async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).send(products);

        } catch (error) {
            console.error('Error while fethcing product:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });
//! click single product,
router.route('/singleproduct/:productId')
    .get(async (req, res) => {
        try {
            const productId = req.params.productId;
            const product = await Product.findOne({ _id: productId });
            res.status(200).json(product);
        } catch (error) {
            res.status(error.status).json({ error });
        }

    })

//! Fetch products by unique identifiers
router.route('/productsByUniqueIdentifiers')
    .post(async (req, res) => {
        try {
            const uniqueIdentifiers = req.body.uniqueIdentifiers; // Get the unique identifiers from the query parameters
            // console.log(uniqueIdentifiers)
            // Assuming your Product model has a field named 'uniqueIdentifier'
            const products = await Product.find({ uniqueIdentifier: { $in: uniqueIdentifiers } });
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products by unique identifiers:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    })

//! Fetch products for single seller
router.route('/seller_products')
    .get(verifyToken, async(req, res) => {
        try {
            const sellerId = req.userId;
            if(!sellerId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const products = await Product.find({ userId: sellerId });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
            console.log(error)
        }
            
    })

//! Delete a single product for seller
router.route('/delete_product/:productId')
 .delete(verifyToken, async (req, res) => {
    try {
      const productId = req.params.productId;
      const userId = req.userId; 
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      if (product.userId.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this product' });
      }

      const deletedProduct = await Product.findByIdAndRemove(productId).select('uniqueIdentifier');
    //   const deletedProduct = await Product.findById(productId).select('uniqueIdentifier');
  
      const updatedProducts = await Product.find({ userId }); 

      res.status(200).json({ message: 'Product deleted successfully', updatedProducts, deletedProduct });
    } catch (error) {
      console.error(error);
      console.log(error)
      res.status(500).json({ message: 'Error deleting product' });
    }
  }) 
    // Table,
    // TableBody,
    // TableCaption,
    // TableCell,
    // TableHead,
    // TableHeader,
    // TableRow,



module.exports = router;