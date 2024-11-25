const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadFile = async (imgString, originalName) => {
  const uploadResult = await cloudinary.uploader.upload(imgString, {
    folder: "PlotAlchemy_Profile",
    public_id: originalName,
  });
  return uploadResult;
};

module.exports = uploadFile;
