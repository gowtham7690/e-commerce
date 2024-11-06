const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dbvzz1zel',
    api_key: '359824968682512',
    api_secret: '9zjBdAe3dXcwHe0Dc9yuCNDRQOo',
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });
    return result;
}

const upload = multer({ storage });
module.exports = { upload, imageUploadUtil };
