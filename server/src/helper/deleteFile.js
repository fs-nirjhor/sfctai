const fs = require("fs").promises;
const logger = require("./winstonLogger");

const deleteFile = async (filePath, defaultFilePath = "") => {
  try {
    if (filePath !== defaultFilePath) {
      // Check if the file exists 
      const isFileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);

      if (isFileExists) {
        // delete the file
        await fs.unlink(filePath);
      }

      logger.info("File deleted successfully");
    } else {
      logger.info("File can't be deleted");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = deleteFile;
