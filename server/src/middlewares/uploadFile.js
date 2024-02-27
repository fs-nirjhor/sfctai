const multer = require("multer");
const path = require("path");
const deleteFile = require("../helper/deleteFile");
const fs = require("fs");
const sharp = require("sharp");
const { mainDirectory } = require("../config/config");

const assetsFilePath = path.resolve(mainDirectory, "./assets");

// apk upload
const apkFilter = async (req, file, cb) => {
  const extension = path.extname(file.originalname);
  if (extension !== ".apk") {
    throw createHttpError("Please upload .apk file");
  }
  await deleteFile(assetsFilePath + "/SFCTAI.apk");
  return cb(null, true);
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
      throw createHttpError(404,"No image provided");
    }
  
    // filename 
    const extension = path.extname(req.file.originalname);
    const filename = req.file.originalname.replace(extension, "") + "_" + Date.now() + ".webp";
      //req.file.originalname.replace(extension, ".webp");
    // file path
    const destination = `${assetsFilePath}/withdraw-verification/${req.body?.client}`;
    // Create the photo path if it doesn't exist
    fs.mkdirSync(destination, { recursive: true });

    const inputPath = req.file?.path;
    const outputPath = `${destination}/${filename}`//path.join(destination, filename);
    const processedImage = await sharp(inputPath)
    .webp({ quality: 20 })
    //.resize({ percentage: 40, withoutEnlargement: true }) 
    .toFile(outputPath);
    const photo = `api/assets/withdraw-verification/${req.body?.client}/${filename}`
    req.body.photo = photo;
    next()
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadApk, uploadWithdrawPhoto, compressWithdrawImage };
