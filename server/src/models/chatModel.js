const { model, Schema } = require("mongoose");

const chatSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
        {
          text: { type: String, default: "" },
          image: { type: String, default: "" },
          sender: { type: Schema.Types.ObjectId, ref: "User" },
          time: { type: Date, default: Date.now },
        },
      ],
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
