const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testDownload() {
  const filePublicId = 'digitalvault/files/file_1779509190797_monika resume.pdf';
  const fileUrl = 'https://res.cloudinary.com/dkc4pkwpn/raw/upload/v1779509194/digitalvault/files/file_1779509190797_monika%20resume.pdf';
  
  let finalDownloadUrl = fileUrl;
  if (filePublicId && fileUrl.includes('cloudinary')) {
    finalDownloadUrl = cloudinary.utils.private_download_url(
      filePublicId, 
      '', 
      { resource_type: 'raw', type: 'upload' }
    );
  }
  
  console.log('finalDownloadUrl:', finalDownloadUrl);
  
  try {
    let pdfBuffer;
    if (finalDownloadUrl.startsWith('http')) {
      const response = await fetch(finalDownloadUrl);
      if (!response.ok) throw new Error(`Failed to fetch PDF from storage: ${response.status} ${response.statusText} ${await response.text()}`);
      const arrayBuffer = await response.arrayBuffer();
      pdfBuffer = Buffer.from(arrayBuffer);
    }
    
    console.log('Buffer length:', pdfBuffer.length);
    const stampPdf = require('./utils/pdfStamp');
    const stamped = await stampPdf(pdfBuffer, 'customer@gmail.com');
    console.log('Stamped length:', stamped.length);
    
  } catch (error) {
    console.error('PDF Download Error:', error.message);
  }
}
testDownload();
