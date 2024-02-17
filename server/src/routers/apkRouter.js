const path = require("path");
const express = require("express");

const apkRouter = express.Router();

// download app
apkRouter.get("/download", async (req, res, next) => {
    const relativeFilePath = './assets/SFCTAI.apk';
    const appDirectory = path.dirname(require.main.filename);
    const absoluteFilePath = path.resolve(appDirectory, relativeFilePath);
  
    res.download(absoluteFilePath, (err) => {
        if (err) {
         //createHttpError(404, err.message)
         //next(err);
         console.log(err.message);
        } 
      });
  });

  module.exports = apkRouter;
  
  