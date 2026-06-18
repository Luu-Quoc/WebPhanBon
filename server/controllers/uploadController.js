const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn ảnh",
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "phan_bon",
      }
    );

    res.status(200).json({
      success: true,
      message: "Upload ảnh thành công",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload thất bại",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};