const multer = require("multer");
const path = require("path");
const deleteFile = require("../helper/deleteFile");

const relativeFilePath = "../assets";
const thisDirectory = path.dirname(require.main.filename);
const absoluteFilePath = path.resolve(thisDirectory, relativeFilePath);

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

module.exports = { uploadApk };
