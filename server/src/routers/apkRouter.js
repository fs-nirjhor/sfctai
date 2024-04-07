const path = require("path");
const express = require("express");
const { uploadApk } = require("../middlewares/uploadFile");
const { successResponse } = require("../controllers/responseController");
const createHttpError = require("http-errors");

const apkRouter = express.Router();

// download app
apkRouter.get("/download", async (req, res, next) => {
  const appDirectory = path.dirname(require.main.filename);
  const relativeFilePath = "./assets/AFTAAI.apk";
  const absoluteFilePath = path.resolve(appDirectory, relativeFilePath);

  res.download(absoluteFilePath, (err) => {
    if (err) {
      //createHttpError(404, err.message)
      //next(err);
      console.log(err.message);
    }
  });
});

// upload app
apkRouter.post("/upload", uploadApk.single("file"), (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      throw createHttpError(400, "Failed to upload file");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Apk uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = apkRouter;
