const createHttpError = require("http-errors");
const cloudinary = require("../config/cloudinaryConfig");

// Function to delete an image using its secure URL
const deleteImageBySecureUrl = async (secureUrl) => {
  try {
    // Extract public ID from secure URL
    const parts = secureUrl?.split("AFTAAI/");
    const publicId = "AFTAAI/" + parts[1]?.split(".")[0];

    // Delete the image using public ID
    const deletedImage = await cloudinary.api.delete_resources(publicId);
    console.log(deletedImage?.deleted);
    return deletedImage;
  } catch (error) {
    console.log(error.message);
    //throw createHttpError(400, error.message)
  }
};

module.exports = { deleteImageBySecureUrl };
