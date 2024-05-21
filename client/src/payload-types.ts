export interface User {
  age: number
  documents: any[]
  email: string
  first_name: string
  last_connection: string
  last_name: string
  password: string
  role: string
  __v: number
  _id: string
}

export interface Product {
  category: string
  code: string
  description: string
  id: string
  owner: string
  price: number
  stock: number
  thumbnail: string
  title: string
  __v: number
  _id: string
}

export interface Cart {
  _id: string
  user: string
  products: Product[]
  createdAt: string
  updatedAt: string
  __v: number
}
