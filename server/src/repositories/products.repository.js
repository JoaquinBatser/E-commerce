export default class ProductsRepository {
  constructor(model) {
    this.productModel = model
  }

  async add(product) {
    return await this.productModel.create(product)
  }

  async get(filter) {
    return await this.productModel.paginate(filter.query, filter.options)
  }

  async getById(id) {
    return await this.productModel.findById(id).lean()
  }

  async delete(id) {
    return await this.productModel.findByIdAndDelete(id).lean()
  }

  async update(id, productUpdate) {
    return await this.productModel
      .findByIdAndUpdate(id, productUpdate, { new: true })
      .lean()
  }
}
