const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  const p = await Product.findOne().sort({createdAt: -1});
  console.log('fileUrl:', p ? p.fileUrl : 'No product');
  process.exit(0);
}
check();
