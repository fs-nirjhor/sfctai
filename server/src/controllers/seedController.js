const fakeData = require("../fakeData");
const Configuration = require("../models/configurationModel");
const User = require("../models/userModel");
const seedItems = require("../services/seedItem");
const { successResponse } = require("./responseController");

const handleSeedUsers = async (req, res, next) => {
  try {
    data = fakeData.users;
    const users = await seedItems(User, data);
    return successResponse(res, {
      statusCode: 201,
      message: "Users seed successfully",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

const handleSeedConfiguration = async (req, res, next) => {
  try {
    data = fakeData.configuration;
    const configuration = await seedItems(Configuration, data);
    return successResponse(res, {
      statusCode: 201,
      message: "configuration seed successfully",
      payload: { configuration },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleSeedUsers, handleSeedConfiguration };
