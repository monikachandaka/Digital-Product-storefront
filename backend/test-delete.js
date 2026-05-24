const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digital-store')
  .then(async () => {
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);
    if (products.length > 0) {
       console.log('First product ID:', products[0]._id.toString());
       
       // Let's try to delete the first one using the exact same code
       const product = await Product.findById(products[0]._id);
       try {
         await product.deleteOne();
         console.log('Successfully deleted the product!');
       } catch (err) {
         console.error('Error deleting product:', err);
       }
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
