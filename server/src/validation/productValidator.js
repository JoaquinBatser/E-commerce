export function productValidator(product) {
  const data = {
    success: true,
    properties: {
      title: true,
      description: true,
      price: true,
      category: true,
      thumbnail: true,
      code: true,
      stock: true,
    },
  }

  if (!product) {
    data.success = false
    data.properties.map((item) => {
      item = false
    })
    return data
  }
  if (!product.title || product.title === undefined || product.title === '') {
    data.properties.title = false
    data.success = false
  }
  if (
    !product.description ||
    product.description === undefined ||
    product.description === ''
  ) {
    data.properties.description = false
    data.success = false
  }
  if (!product.price || product.price === undefined || product.price === 0) {
    data.properties.price = false
    data.success = false
  }
  if (
    !product.category ||
    product.category === undefined ||
    product.category === ''
  ) {
    data.properties.category = false
    data.success = false
  }
  if (
    !product.thumbnail ||
    product.thumbnail === undefined ||
    product.thumbnail === ''
  ) {
    data.properties.thumbnail = false
    data.success = false
  }
  if (!product.code || product.code === undefined || product.code === '') {
    data.properties.code = false
    data.success = false
  }
  if (!product.stock || product.stock === undefined || product.stock === 0) {
    data.properties.stock = false
    data.success = false
  }
  return data
}
