require('dotenv').config();
require('./middleware/upload');
const cloudinary = require('cloudinary').v2;
try {
  cloudinary.uploader.destroy('some_id', { resource_type: 'raw' }).catch(() => {});
  console.log('Success calling destroy');
} catch (e) {
  console.error('Synchronous error:', e);
}
