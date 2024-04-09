const createHttpError = require("http-errors");
const { updateItemById } = require("../services/updateItem");
const { successResponse } = require("./responseController");
const Configuration = require("../models/configurationModel");

const handleGetConfiguration = async (req, res, next) => {
  try {
    const configuration = await Configuration.findOne();

    if (!configuration) {
      throw createHttpError(400, "Failed to get configuration");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Configuration get successfully",
      payload: { configuration },
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateConfiguration = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { update } = req.body;

    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
    };

    const newConfiguration = await updateItemById(
      Configuration,
      id,
      update,
      updateOptions
    );

    if (!newConfiguration) {
      throw createHttpError(400, "Failed to update configuration");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Configuration updated successfully",
      payload: { newConfiguration },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleUpdateConfiguration, handleGetConfiguration };
