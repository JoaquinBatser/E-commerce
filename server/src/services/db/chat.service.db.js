import { messageModel } from '../../models/messages.model.js'

export default class ChatService {
  constructor(repo) {
    this.repo = repo
  }
  async createMessage(message) {
    try {
      const newMessage = await this.repo.create(message)
      return !newMessage
        ? { success: false, message: 'Message not created' }
        : { success: true, message: 'Message created', newMessage }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while creating a message',
        error: error.message,
      }
    }
  }
  async findMessages() {
    try {
      const messages = await this.repo.get()
      return !messages
        ? { success: false, message: 'Messages not found' }
        : { success: true, message: 'Messages found', messages }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching messages',
        error: error.message,
      }
    }
  }
}
