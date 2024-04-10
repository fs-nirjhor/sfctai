const fakeData = require("../fakeData");
const Configuration = require("../models/configurationModel");
const User = require("../models/userModel");
const seedItems = require("../services/seedItem");
const { successResponse } = require("./responseController");

const handleSeedUsers = async (req, res, next) => {
  try {
    await User.updateMany({}, { "authentication.status": "" });
    console.log("Users seed successfully");
    return successResponse(res, {
      statusCode: 201,
      message: "Users seed successfully",
      //payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

const handleSeedConfiguration = async (req, res, next) => {
  try {
    data = fakeData.configuration;
    const configuration = await seedItems(Configuration, data);
    console.log("configuration seed successfully");
    return successResponse(res, {
      statusCode: 201,
      message: "configuration seed successfully",
      //payload: { configuration },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleSeedUsers, handleSeedConfiguration };
