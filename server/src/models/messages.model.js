import mongoose from 'mongoose'

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema(
  {
    chatUser: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const messageModel = mongoose.model(messageCollection, messageSchema)
