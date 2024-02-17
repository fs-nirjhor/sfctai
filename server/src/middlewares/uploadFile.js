const multer = require("multer");
const path = require("path");


const relativeFilePath = '../assets';
  const thisDirectory = path.dirname(require.main.filename);
  const absoluteFilePath = path.resolve(thisDirectory, relativeFilePath);

const apkStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, absoluteFilePath);
  },
 // filename: file.originalname
});

const apkFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname);
    if (extension == ".apk") {
      const error = new Error("Please upload .apk file");
      return cb(error, false);
    }
    return cb(null, true);
  };
  

const uploadApk = multer({
  storage: apkStorage,
  fileFilter: apkFilter,
});



module.exports = {uploadApk };
