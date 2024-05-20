export default class CartsRepository {
  constructor(model) {
    this.cartModel = model
  }

  async get() {
    return await this.cartModel.find().lean()
  }

  async getById(id) {
    return await this.cartModel.findById(id).lean()
  }

  async getUserCart(userId) {
    return await this.cartModel.findOne({ user: userId }).lean()
  }

  async new(userId) {
    return await this.cartModel.create({ user: userId, products: [] })
  }

  async addToCart(cId, pId) {
    const productExistsInCart = await this.cartModel.exists({
      _id: cId,
      'products.product': pId,
    })
    let cart
    if (!productExistsInCart) {
      cart = await this.cartModel
        .findByIdAndUpdate(
          cId,
          { $push: { products: { product: pId, quantity: 1 } } },
          { new: true }
        )
        .lean()
    } else {
      cart = await this.cartModel
        .findOneAndUpdate(
          { _id: cId, 'products.product': pId },
          { $inc: { 'products.$.quantity': 1 } },
          { new: true }
        )
        .lean()
    }

    return cart
  }

  async updateProductQuantity(cId, pId, quantity) {
    const productExistsInCart = await this.cartModel.exists({
      _id: cId,
      'products.product': pId,
    })

    if (!productExistsInCart) {
      throw new Error('Product not found in cart')
    }

    const cart = await this.cartModel
      .findOneAndUpdate(
        { _id: cId, 'products.product': pId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      )
      .lean()

    return cart
  }

  async deleteProductFromCart(cId, pId) {
    const cart = await this.cartModel
      .findByIdAndUpdate(
        cId,
        { $pull: { products: { product: pId } } },
        { new: true }
      )
      .lean()
    return cart
  }

  async emptyCart(cId) {
    const cart = await this.cartModel
      .findByIdAndUpdate(cId, { $set: { products: [] } }, { new: true })
      .lean()
    return cart
  }

  async newTicket(ticketData) {
    return await this.cartModel.create(ticketData)
  }
}
