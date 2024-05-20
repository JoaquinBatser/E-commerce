import supertest from 'supertest'
import * as chai from 'chai'

const expect = chai.expect
const requester = supertest('http://localhost:8000')

describe('Testing e-commerce', () => {
  let cookie
  const randomNumber = Math.floor(Math.random() * 1000)

  describe('Testing sessions', () => {
    it('REGISTER', async () => {
      const user = {
        first_name: `John${randomNumber}`,
        last_name: 'Doe',
        email: `john${randomNumber}doe@email.com`,
        password: '123',
        age: 33,
        role: 'user',
      }

      const response = await requester.post('/api/sessions/signup').send(user)
      expect(response._body.success).to.be.equal(true)
    })
    it('LOGIN', async () => {
      const user = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
      }

      const response = await requester.post('/api/sessions/login').send(user)
      const cookieResult = response.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],

        value: cookieResult.split('=')[1].split(';')[0],
      }
      expect(cookie.name).to.be.equal('connect.sid')
    })
    it('CURRENT USER', async () => {
      const { _body } = await requester
        .get('/api/sessions/current')
        .set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(_body.user.user.email).to.be.equal('adminCoder@coder.com')
    })
  })
  describe('Testing products', () => {
    it('FETCH ALL PRODDUCTS', async () => {
      const response = await requester.get('/api/products')
      expect(response._body.productsData.success).to.be.equal(true)
    })
    it('ADD PRODUCT', async () => {
      const user = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
      }

      const loginResponse = await requester
        .post('/api/sessions/login')
        .send(user)
      const cookieResult = loginResponse.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1].split(';')[0],
      }
      expect(cookie.name).to.be.equal('connect.sid')

      const product = {
        title: `Product Test ${randomNumber}`,
        description: 'Product Test Description',
        price: 100,
        category: 'test',
        thumbnail: 'test',
        code: `code-${randomNumber}`,
        stock: 10,
        owner: '6603c5f944ec1b8c56b9b1c9',
      }

      const response = await requester
        .post('/api/products')
        .set('Cookie', [`${cookie.name}=${cookie.value}`])
        .send(product)
      expect(response._body.productData.success).to.be.equal(true)
    })
    it('DELETE PRODUCT', async () => {
      const user = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
      }

      const loginResponse = await requester
        .post('/api/sessions/login')
        .send(user)
      const cookieResult = loginResponse.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1].split(';')[0],
      }
      expect(cookie.name).to.be.equal('connect.sid')

      const productId = '662be79ee680c2335978b29a'

      const response = await requester
        .delete(`/api/products/${productId}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`])

      console.log(response._body)
      expect(response._body.productData.success).to.be.equal(true)
    })
  })
  describe('Testing cart', () => {
    it('FETCH CART BY ID', async () => {
      const cartId = '6603bd711ad287eb78d911bb'
      const response = await requester.get(`/api/carts/${cartId}`)
      expect(response._body.cartData.success).to.be.equal(true)
    })
    it('ADD PRODUCT TO CART', async () => {
      const user = {
        email: 'adminCoder@coder.com',
        password: 'adminCod3r123',
      }

      const loginResponse = await requester
        .post('/api/sessions/login')
        .send(user)
      const cookieResult = loginResponse.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1].split(';')[0],
      }
      expect(cookie.name).to.be.equal('connect.sid')

      const cartId = '660673ce9e914718fc4904d0'
      const productId = '662ae6e6db862148275f1e98'
      const response = await requester
        .post(`/api/carts/${cartId}/product/${productId}`)
        .set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(response._body.cartData.success).to.be.equal(true)
    })
    it('EMPTY CART', async () => {
      const cartId = '660673ce9e914718fc4904d0'
      const response = await requester.delete(`/api/carts/${cartId}`)
      expect(response._body.cartData.success).to.be.equal(true)
    })
  })
})
