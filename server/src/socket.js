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
    origin: clientUrl,
  },
});

io.on("connection", (socket) => {
  //console.log("User connected:", socket.id);

  // Handle connection with user data
  socket.on("chats", async ({ isAdmin, id }) => {
    try {
      let chats;

      if (isAdmin) {
        chats = await Chat.find()
          .populate("client")
          .sort({ updatedAt: -1 })
          .lean();
      } else {
        // Check if a chat exists for the client
        const existingChat = await Chat.findOne({ client: id })
          .populate("client")
          .lean();

        if (!existingChat) {
          // If no chat exists, create a new one
          const newChat = await Chat.create({ client: id }).lean;
        } else {
          // If a chat exists, fetch it
          chats = [existingChat];
        }
      }
      // Emit the chats
      socket.emit("chats", chats);
    } catch (error) {
      console.log(error);
      throw createHttpError(400, error.message);
    }
  });

  // Handle incoming messages
  socket.on("message", async ({ isAdmin, text, image, sender, client }) => {
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
                folder: `STFAI/chat/${client}`,
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
          .lean();
      } else {
        response = [updatedChat];
      }
      // send response
      io.emit("message", response);
    } catch (error) {
      console.log(error);
      throw createHttpError(400, error.message);
    }
  });

  socket.on("seen", async ({ isAdmin, client }) => {
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
          .lean();
      } else {
        response = [updatedChat];
      }
      // send response
      io.emit("seen", response);
    } catch (error) {
      console.log(error);
      throw createHttpError(400, error.message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    //console.log("User disconnected:", socket.id);
  });
});

module.exports = server;
