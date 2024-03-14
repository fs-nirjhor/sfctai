const multer = require("multer");
const path = require("path");
const deleteFile = require("../helper/deleteFile");
const fs = require("fs");
const sharp = require("sharp");
const { mainDirectory } = require("../config/config");
const cloudinary = require("../config/cloudinaryConfig");
const createHttpError = require("http-errors");

const assetsFilePath = path.resolve(mainDirectory, "./assets");

// apk upload
const apkFilter = async (req, file, cb) => {
  try {
    // check if its .apk file
    const extension = path.extname(file.originalname);
    if (extension !== ".apk") {
      throw createHttpError("Please upload .apk file");
    }
    // delete previous file if exist
    const apkFilePath = assetsFilePath + "/SFCTAI.apk";
    await deleteFile(apkFilePath);
    return cb(null, true);
  } catch (error) {
    return cb(error, false);
  }
};

const apkStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, assetsFilePath);
  },
  filename: (req, file, cb) => {
    cb(null, "SFCTAI.apk");
  },
});

const uploadApk = multer({
  fileFilter: apkFilter,
  storage: apkStorage,
});

// photo upload
const withdrawPhotoFilter = async (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    throw createHttpError(400, "Only images are allowed");
  }
  cb(null, true);
};

const withdrawPhotoStorage = multer.diskStorage({
  /* destination: (req, file, cb) => {
    const destination = `${assetsFilePath}/withdraw-verification/${req.body?.client}`;

    // Create the photo folder if it doesn't exist
    fs.mkdirSync(destination, { recursive: true }); 

    cb(null, destination);
  }, */
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadWithdrawPhoto = multer({
  fileFilter: withdrawPhotoFilter,
  storage: withdrawPhotoStorage,
});

const compressWithdrawImage = async (req, res, next) => {
  try {
    // Check if file exists
    if (!req.file) {
      throw createHttpError(404, "No image provided");
    }

    // filename
    const extension = path.extname(req.file.originalname);
    const filename =
      req.file.originalname.replace(extension, "") + "_" + Date.now() + ".webp";
    //req.file.originalname.replace(extension, ".webp");
    // file path
    const destination = `${assetsFilePath}/withdraw-verification/${req.body?.client}`;
    // Create the photo path if it doesn't exist
    fs.mkdirSync(destination, { recursive: true });

    const inputPath = req.file?.path;
    const outputPath = `${destination}/${filename}`; //path.join(destination, filename);
    const processedImage = await sharp(inputPath)
      .webp({ quality: 20 })
      //.resize({ percentage: 40, withoutEnlargement: true })
      .toFile(outputPath);
    const photo = `api/assets/withdraw-verification/${req.body?.client}/${filename}`;
    req.body.photo = photo;
    next();
  } catch (error) {
    next(error);
  }
};

const withdrawImageToCloudinary = async (req, res, next) => {
  try {
    const client = req.body?.client;
    const cloudImage = await cloudinary.uploader.upload(req.file?.path, {
      folder: `SFCTAI/withdraw-verification/${client}`,
      public_id: `${client}_${Date.now()}`,
      tags: ["withdraw-verification", "SFCTAI", client],
      use_filename: true,
      unique_filename: true,
      format: "webp",
      quality: 20,
    });
    req.body.photo = cloudImage.secure_url;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadApk,
  uploadWithdrawPhoto,
  compressWithdrawImage,
  withdrawImageToCloudinary,
};
