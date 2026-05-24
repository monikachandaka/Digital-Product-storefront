const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/monika');
    const products = await Product.find({ category: 'eBooks' });
    console.log(`Found ${products.length} eBooks:`);
    products.forEach(p => console.log(p.title));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

check();
