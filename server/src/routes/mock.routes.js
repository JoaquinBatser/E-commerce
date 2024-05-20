import { Router } from 'express'
import { generateProducts } from '../utils.js'

const mockRouter = Router()

mockRouter.get('/', (req, res) => {
  let products = []
  for (let i = 0; i < 100; i++) {
    products.push(generateProducts())
  }

  res.send({ message: 'Mock data generated', products })
})

export default mockRouter
