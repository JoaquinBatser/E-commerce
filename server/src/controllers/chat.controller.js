import repositories from '../repositories/index.js'
import CustomError from '../services/CustomError.js'
import ChatService from '../services/db/chat.service.db.js'

const chatService = new ChatService(repositories.messages)

const createMessage = async (req, res) => {
  try {
    const { chatUser, message } = req.body
    const newMessage = await chatService.createMessage({ chatUser, message })
    if (!newMessage) {
      throw new CustomError('Error creating message', 400)
    }
    req.io.emit('newMessage', newMessage)

    return res.status(201).json({ success: true })
  } catch (error) {
    next(error)
  }
}

const getMessages = async (req, res, next) => {
  try {
    const messagesData = await chatService.findMessages()
    if (!messagesData.success) {
      throw new CustomError(messagesData.message, 400)
    }

    return res.status(200).json({ messagesData })
  } catch (error) {
    next(error)
  }
}

export default { createMessage, getMessages }
