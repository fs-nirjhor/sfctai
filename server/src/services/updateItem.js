const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { findOneItem, findItemById } = require("./findItem");
const User = require("../models/userModel");

const updateItem = async (Model, filter, updates, options = {}) => {
  try {
    await findOneItem(Model, filter);
    const updatedItem = await Model.findOneAndUpdate(filter, updates, options).lean();

    if (!updatedItem) {
      throw createHttpError(400, "Failed to update");
    }
    return updatedItem;
  } catch (error) {
    throw createHttpError(400, error.message);
  }
};

const updateItemById = async (Model, id, updates, options = {}) => {
  try {
    await findItemById(Model, id);
    const updatedItem = await Model.findByIdAndUpdate(id, updates, options).lean(); 
    
    if (!updatedItem) {
      throw createHttpError(400, "Failed to update");
    }
    return updatedItem;
  } catch (error) {
    throw error;
  }
};

const updateIsBanned = async (id, action) => {
  try {
    const user = await findItemById(User, id, { password: 0 });
    let status;
    switch (action) {
      case "ban":
        status = true;
        break;
      case "unban":
        status = false;
        break;
      default:
        throw createHttpError(
          400,
          `Invalid action (${action}). Only ban and unban are allowed`
        );
    }
    if (user.isBanned === status) {
      throw createHttpError(
        409,
        `${user.name} is already ${status ? "banned" : "unbanned"}`
      );
    }
    const update = { isBanned: status };
    const updateOptions = { new: true, runValidators: true, context: "query" };

    const bannedUser = await User.findByIdAndUpdate(
      id,
      update,
      updateOptions
    ).select("-password");
    if (!bannedUser) throw new Error(`Failed to ${action}`);
    return bannedUser;
  } catch (error) {
    throw error;
  }
};

const updateManyKey = async (Model, filter, updateKeys, req, options = {}) => {
  try {
    const currentItem = await findOneItem(Model, filter);
    const updates = {};
    // user is set in req.body from isLoggedIn middleware. it must not include in data
    const { user, ...data } = req.body;

    if (Object.keys(data).length === 0) {
      throw createHttpError(400, "Nothing to update");
    }
    for (let key in data) {
      if (!updateKeys.includes(key)) {
        throw createHttpError(400, `${key} can\'t be updated`);
      }
      if (data[key] == currentItem[key]) {
        throw createHttpError(409, `${key} is already updated`);
      }
      updates[key] = data[key];
    }
    const updateOptions = {
      new: true,
      runValidators: true,
      context: "query",
      ...options,
    };
    const updatedItem = await updateItem(Model, filter, updates, updateOptions);
    if (!updatedItem) {
      throw createHttpError(400, "Failed to update");
    }

    return updatedItem;
  } catch (error) {
      throw createHttpError(400, error.message);
  }
};

module.exports = { updateItem, updateItemById, updateIsBanned, updateManyKey };
