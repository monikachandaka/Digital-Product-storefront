const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkCloudinary() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:raw')
      .execute();
    console.log('Raw files in Cloudinary:', result.resources.map(r => ({
      public_id: r.public_id,
      url: r.url,
      secure_url: r.secure_url,
      access_mode: r.access_mode
    })));
  } catch (err) {
    console.error('Search error:', err);
  }
}
checkCloudinary();
