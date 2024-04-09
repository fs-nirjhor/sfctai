// seed api for "/api/seed"

const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
  handleSeedUsers,
  handleSeedConfiguration,
} = require("../controllers/seedController");
const seedRouter = express.Router();

// api/seed/users
seedRouter.put("/users", isLoggedIn, isAdmin, handleSeedUsers);

// api/seed/configuration
seedRouter.post("/configuration", isLoggedIn, isAdmin, handleSeedConfiguration);

module.exports = seedRouter;
