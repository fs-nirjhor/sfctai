const multer = require("multer");
const path = require("path");
const deleteFile = require("../helper/deleteFile");
const fs = require("fs");

const relativeFilePath = "./assets";
const thisDirectory = path.dirname(require.main.filename);
const absoluteFilePath = path.resolve(thisDirectory, relativeFilePath);

// apk upload
const apkFilter = async (req, file, cb) => {
  const extension = path.extname(file.originalname);
  if (extension !== ".apk") {
    throw createHttpError("Please upload .apk file");
  }
  await deleteFile(absoluteFilePath + "/SFCTAI.apk");
  return cb(null, true);
};

const apkStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, absoluteFilePath);
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
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images allowed."));
  }
};

const withdrawPhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = `${absoluteFilePath}/withdraw-verification/${req.body?.client}`;

    // Create the photo folder if it doesn't exist
    fs.mkdirSync(destination, { recursive: true }); 

    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadWithdrawPhoto = multer({
  fileFilter: withdrawPhotoFilter,
  storage: withdrawPhotoStorage,
});

module.exports = { uploadApk, uploadWithdrawPhoto };
