import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { faker } from '@faker-js/faker'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

//

import bcrypt, { hashSync, genSaltSync, compareSync } from 'bcrypt'

// register
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

//login
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

//mocks

export const generateProducts = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    thumbnail: faker.image.url(),
    code: faker.commerce.isbn(),
    stock: faker.number.int({ min: 1, max: 1000 }),
  }
}

export const generateUser = () => {
  return {
    id: faker.database.mongodbObjectId(),
    first_name: faker.person.userName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    role: faker.database.boolean() ? 'user' : 'admin',
    password: faker.internet.password(),
  }
}
