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
    const apkFilePath = assetsFilePath + "/AFTAAI.apk";
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
    cb(null, "AFTAAI.apk");
  },
});

const uploadApk = multer({
  fileFilter: apkFilter,
  storage: apkStorage,
});

// photo upload
const photoFilter = async (req, file, cb) => {
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

const photoStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadWithdrawPhoto = multer({
  fileFilter: photoFilter,
  storage: withdrawPhotoStorage,
});

const uploadPhoto = multer({
  fileFilter: photoFilter,
  storage: photoStorage,
});

const withdrawImageToCloudinary = async (req, res, next) => {
  try {
    const client = req.body?.client;
    const cloudImage = await cloudinary.uploader.upload(req.file?.path, {
      folder: `AFTAAI/withdraw-verification/${client}`,
      public_id: `${client}_${Date.now()}`,
      tags: ["withdraw-verification", "AFTAAI", client],
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
const NidImageToCloudinary = async (req, res, next) => {
  try {
    const client = req.params.id;
    // Access frontPhoto and backPhoto
    const frontPhotoPath = req.files["frontPhoto"][0]?.path;
    const backPhotoPath = req.files["backPhoto"][0]?.path;
    const options = {
      folder: `AFTAAI/nid/${client}`,
      public_id: `${client}_${Date.now()}`,
      tags: ["nid", "AFTAAI", client],
      use_filename: true,
      unique_filename: true,
      format: "webp",
      quality: 80,
    };
    // upload photo
    const frontPhoto = await cloudinary.uploader.upload(
      frontPhotoPath,
      options
    );
    const backPhoto = await cloudinary.uploader.upload(backPhotoPath, options);
    // set photo to req.body
    req.body.frontPhoto = frontPhoto.secure_url;
    req.body.backPhoto = backPhoto.secure_url;
    next();
  } catch (error) {
    next(error);
  }
};

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

module.exports = {
  uploadApk,
  uploadPhoto,
  uploadWithdrawPhoto,
  compressWithdrawImage,
  withdrawImageToCloudinary,
  NidImageToCloudinary,
};
