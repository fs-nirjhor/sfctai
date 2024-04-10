//* router for 'api/users'

const express = require("express");
const {
  handleGetAllUsers,
  handleGetUser,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdatePassword,
  handleForgetPassword,
  handleResetPassword,
  handleUserStatus,
  handleRegistration,
  handleUploadNid,
  handleAproveNid,
  handleRejectNid,
} = require("../controllers/userController");
const {
  validateUserRegistration,
  validateForgetPassword,
  validateResetPassword,
} = require("../validators/userValidator");
const runValidations = require("../validators");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");
const {
  uploadPhoto,
  NidImageToCloudinary,
} = require("../middlewares/uploadFile");

const userRouter = express.Router();

userRouter.post(
  "/registration",
  isLoggedOut,
  validateUserRegistration,
  runValidations,
  handleRegistration
);

userRouter.get("/", isLoggedIn, isAdmin, handleGetAllUsers);

userRouter.get("/:id", isLoggedIn, handleGetUser);

userRouter.put(
  "/update-password/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  handleUpdatePassword
);

userRouter.get("/", isLoggedIn, isAdmin, handleGetAllUsers);

userRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, handleDeleteUser);

userRouter.put("/:id([0-9a-fA-F]{24})", isLoggedIn, handleUpdateUser);

userRouter.post(
  "/upload-nid/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  uploadPhoto.fields([
    { name: "frontPhoto", maxCount: 1 },
    { name: "backPhoto", maxCount: 1 },
  ]),
  NidImageToCloudinary,
  handleUploadNid
);

userRouter.put(
  "/approve-nid/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleAproveNid
);
userRouter.put(
  "/reject-nid/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleRejectNid
);

// api/users/forget-password
userRouter.post(
  "/forget-password",
  validateForgetPassword,
  runValidations,
  handleForgetPassword
);
// api/users/reset-password
userRouter.put(
  "/reset-password",
  validateResetPassword,
  runValidations,
  handleResetPassword
);

// api/users/status/:id
userRouter.put(
  "/status/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleUserStatus
);

// api/users/test
userRouter.get("/test", (req, res) => {
  res.send("testing router");
});

module.exports = userRouter;
