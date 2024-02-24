const socketIO = require("socket.io");
const createHttpError = require("http-errors");
const Chat = require("./models/chatModel");
const http = require("http");
const app = require("./app");
const {
  cloudinaryName,
  cloudinaryKey,
  cloudinarySecret,
  clientUrl,
} = require("./secret");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
const logger = require("./helper/winstonLogger");
const { setPagination } = require("./helper/managePagination");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});

const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*" //clientUrl,
  },
});

io.on("connection", (socket) => {
  //logger.info("Socket connected:", socket.id);

  // Handle connection with user data
  socket.on("chats", async ({ isAdmin, id, page, limit }) => {
    try {
      let data = {chats: [], pagination: {}}

      if (isAdmin) {
        const chats = await Chat.find()
          .populate("client")
          .sort({ updatedAt: -1 })
          .limit(limit)
          .skip((page - 1) * limit)
          .lean();
          if (!chats) {
            throw createHttpError(404, "No chat found");
          }
          // set pagination
          const count = await Chat.find().countDocuments();
          const result = chats.length;
          const pagination = setPagination(count, limit, page, result);
          data = {chats, pagination}
      } else {
        // Check if a chat exists for the client
        const existingChat = await Chat.findOne({ client: id })
          .populate("client")
          .lean();

        if (!existingChat) {
          // If no chat exists, create a new one
          const newChat = await Chat.create({ client: id }).lean;
          data = {chats: [newChat], pagination:{}};
        } else {
          // If a chat exists, fetch it
          data = {chats: [existingChat], pagination:{}};
        }
      }
      // Emit the chats
      socket.emit("chats", data);
    } catch (error) {
      throw createHttpError(400, error.message);
    }
  });

  // Handle incoming messages
  socket.on("message", async ({ isAdmin, text, image, sender, client, page, limit }) => {
    try {
      // Upload image to Cloudinary
      let imageUrl = "";
      if (image) {
        const imageStream = new Readable();
        imageStream.push(image);
        imageStream.push(null);

        // Wrap the Cloudinary upload operation in a Promise
        imageUrl = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: `SFCTAI/chat/${client}`,
                public_id: `${client}_${Date.now()}`,
                use_filename: true,
                unique_filename: false,
              },
              (error, result) => {
                if (error) {
                  console.error(error);
                  reject(error);
                } else {
                  resolve(result.secure_url);
                }
              }
            )
            .end(image);
        });
      }
      
      // message data
      const newMessage = {
        text: text,
        image: imageUrl,
        sender: sender,
      };

      // update message
      const updatedChat = await Chat.findOneAndUpdate(
        { client },
        { $push: { messages: newMessage }, $set: { isSeen: false } },
        {
          new: true,
          runValidators: true,
          context: "query",
          populate: { path: "client" },
        }
      ).lean();

      // conditional response
      let response;

      if (isAdmin) {
        response = await Chat.find()
        .populate("client")
        .sort({ updatedAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();
      } else {
        response = [updatedChat];
      }
      // send response
      io.emit("message", response);
    } catch (error) {
      //console.log(error);
      throw createHttpError(400, error.message);
    }
  });

  // handle seen messages
  socket.on("seen", async ({ isAdmin, client, page, limit }) => {
    try {
      // update message
      const updatedChat = await Chat.findOneAndUpdate(
        { client },
        { $set: { isSeen: true } },
        {
          new: true,
          runValidators: true,
          context: "query",
          populate: { path: "client" },
        }
      ).lean();

      // conditional response
      let response;

      if (isAdmin) {
        response = await Chat.find()
        .populate("client")
        .sort({ updatedAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean();
      } else {
        response = [updatedChat];
      }
      // send response
      io.emit("seen", response);
    } catch (error) {
      logger.error(error);
      throw createHttpError(400, error.message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    //logger.info("Socket disconnected:", socket.id);
  });
});

module.exports = server;
