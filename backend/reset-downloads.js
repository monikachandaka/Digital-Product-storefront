const mongoose = require('mongoose');
require('dotenv').config();
const Order = require('./models/Order');

async function reset() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    const result = await Order.updateMany(
      {}, 
      { $set: { 'downloadLinks.$[].downloadCount': 0, 'downloadLinks.$[].maxDownloads': 100 } }
    );
    console.log('Reset complete:', result);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
reset();
