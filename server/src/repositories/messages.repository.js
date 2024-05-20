export default class MessagesRepository {
  constructor(model) {
    this.messageModel = model
  }

  async create(message) {
    return await this.messageModel.create(message)
  }

  async get() {
    return await this.messageModel.find().lean()
  }
}
