import { createHash, isValidPassword } from '../utils.js'
import { cartModel } from '../models/carts.model.js'
export default class UsersRepository {
  constructor(model) {
    this.userModel = model
  }

  async getAll() {
    return await this.userModel.find({}, { first_name: 1, email: 1, role: 1 })
  }

  async delete(uId) {
    return await this.userModel.deleteOne({ _id: uId })
  }

  async add(user) {
    let newUser
    const { email, password } = user

    const userExists = await this.userModel.findOne({ email })

    if (userExists) {
      return { message: 'User already exists', success: false }
    }

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      newUser = await this.userModel.create({
        ...user,
        password: createHash(password),
        role: 'admin',
      })
    } else {
      newUser = await this.userModel.create({
        ...user,
        password: createHash(password),
        role: 'user',
      })
    }

    const cart = await cartModel.create({
      user: newUser._id,
      products: [],
    })

    if (!cart) {
      return { message: 'Error creating cart for user', success: false }
    }

    return { success: true, message: 'User created', user: newUser }
  }

  async login({ email, password }) {
    const user = await this.userModel.findOne({ email })
    console.log(user)

    if (!user) {
      return { message: 'User does not exist', success: false }
    }
    const isValid = isValidPassword(user, password)

    if (!isValid) {
      return { message: 'Invalid credentials', success: false }
    }

    return { success: true, message: 'User logged in', user }
  }
  async isValid(user, password) {
    return isValidPassword(user, password)
  }

  async getByEmail(email) {
    return await this.userModel.findOne({ email })
  }

  async getById(id) {
    return await this.userModel.findById(id)
  }
  async updatePassword(id, newPassword) {
    return await this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { password: newPassword } },
        { new: true }
      )
      .lean()
  }
  async changeRole(id, newRole) {
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { role: newRole } },
      { new: true }
    )
  }
  async lastConnection(id) {
    return await this.userModel.updateOne(
      { _id: id },
      { $set: { last_connection: Date.now() } }
    )
  }
  async addDocuments(uId, name, reference) {
    return await this.userModel
      .updateOne(
        { _id: uId },
        { $push: { documents: { name: name, reference: reference } } }
      )
      .lean()
  }

  async deleteOldUsers() {
    const TIME = 1
    const oldUsers = await this.userModel
      .find({
        last_connection: { $lt: Date.now() - TIME },
      })
      .lean()

    await this.userModel.deleteMany({
      last_connection: { $lt: Date.now() - TIME },
    })

    return oldUsers
  }
}
