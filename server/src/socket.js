const socketIO = require("socket.io");
const createHttpError = require("http-errors");
const Chat = require("./models/chatModel");
const http = require("http");
const app = require("./app");
const { clientUrl, serverUrl } = require("./secret");
const { Readable } = require("stream");
const logger = require("./helper/winstonLogger");
const { setPagination } = require("./helper/managePagination");
const cloudinary = require("./config/cloudinaryConfig");
const { messaging } = require("./config/firebase.init");

const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*", //clientUrl,
  },
});

io.on("connection", (socket) => {
  //logger.info("Socket connected:", socket.id);

  // get chats or chatlist
  socket.on("chats", async ({ isAdmin, id, page, limit }) => {
    try {
      const data = { chats: {}, chatlist: [], pagination: {} };

      if (isAdmin) {
        // update chatlist for admin
        const chatlist = await Chat.find()
          .populate("client")
          .sort({ updatedAt: -1 })
          .limit(limit)
          .skip((page - 1) * limit)
          .lean();
        if (!chatlist) {
          throw createHttpError(404, "No chat found");
        }
        data.chatlist = chatlist;
        // set pagination
        const count = await Chat.find().countDocuments();
        const result = chatlist.length;
        data.pagination = setPagination(count, limit, page, result);
      }
      // Seen chat on load
      const seenChat = await Chat.findOneAndUpdate(
        { client: id },
        { $set: { isSeen: true } },
        {
          new: true,
          runValidators: true,
          context: "query",
          populate: { path: "client" },
        }
      ).lean();
      // If no chat exists, create a new one
      data.chats = seenChat || (await Chat.create({ client: id }).lean);

      // Emit the chats
      socket.emit("chats", data);
    } catch (error) {
      throw createHttpError(400, error.message);
    }
  });

  // Handle incoming messages
  socket.on(
    "message",
    async ({ isAdmin, text, image, sender, client, page, limit }) => {
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
                  tags: ["chat", "SFCTAI", client],
                  use_filename: true,
                  unique_filename: false,
                  format: "webp",
                  quality: 25,
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

        // conditional response
        const data = { chats: {}, chatlist: [], pagination: {} };

        // update message
        data.chats = await Chat.findOneAndUpdate(
          { client },
          { $push: { messages: newMessage }, $set: { isSeen: false } },
          {
            new: true,
            runValidators: true,
            context: "query",
            populate: { path: "client" },
          }
        ).lean();

        if (isAdmin) {
          data.chatlist = await Chat.find()
            .populate("client")
            .sort({ updatedAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();
        }
        // send response
        io.emit("message", data);

        // send notification
        const topic = isAdmin ? client : "admin";
        const referer = new URL(socket.handshake?.headers?.referer);
        const origin = referer?.origin;
        const link = `${origin}/my/chat/${client}`
        const icon = `${origin}/api/assets/icon.png`
        const avatar = data.chats?.client?.avatar
        const notificationData = {
          topic: topic,
          data: {
            title: `New message from ${
              isAdmin ? "SFCTAI" : data.chats?.client?.name
            }!`,
            body: text,
            image: imageUrl,
            icon: `${isAdmin ? icon : avatar}`,
            link: link,
            tag: topic,
          },
           /* notification: {
            title: `New message from ${
              isAdmin ? "SFCTAI" : data.chats?.client?.name
            }!`,
            body: text,
            image: imageUrl
          }, 
          webpush: {
            notification: {
              title: `New message from ${
                isAdmin ? "SFCTAI" : data.chats?.client?.name
              }!`,
              body: text,
              image: imageUrl,
              badge: icon,
              icon: `${isAdmin ? icon : avatar}`,
              renotify: true,
              tag: `sfctai-${topic}`,
              timestamp: Math.floor(Date.now()),
            },
            fcmOptions: {
              link: link,
            },
          }, */
           android: {
            notification: {
              icon: icon,
              color: "#38bdf8",
              clickAction: link,
              imageUrl: icon,
            }
          },
          apns: {
            payload: {
              aps: {
                'mutable-content': 1
              }
            },
            fcm_options: {
              image: icon
            }
          },
        };
         await messaging.send(notificationData);
      } catch (error) {
        //console.log(error);
        throw createHttpError(400, error.message);
      }
    }
  );

  // Handle disconnection
  socket.on("disconnect", () => {
    //logger.info("Socket disconnected:", socket.id);
  });
});

module.exports = server;
