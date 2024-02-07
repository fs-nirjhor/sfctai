
const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { handleUpdateConfiguration, handleGetConfiguration } = require("../controllers/configurationController");

const configurationRouter = express.Router();

configurationRouter.get(
  "/",
  handleGetConfiguration
);

configurationRouter.put(
  "/:id",
  isLoggedIn,
  isAdmin,
  handleUpdateConfiguration
);

module.exports = configurationRouter;