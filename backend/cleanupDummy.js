const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const clean = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/monika');
    const res = await Product.deleteMany({ stock: 999 });
    console.log(`Deleted ${res.deletedCount} dummy products.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

clean();
