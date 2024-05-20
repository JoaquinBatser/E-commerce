import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true, max: 100 },
  last_name: { type: String, require: true, max: 100 },
  email: { type: String, require: true, max: 100, unique: true },
  password: { type: String, require: true, max: 100 },
  age: { type: Number, require: true, max: 100 },
  role: { type: String, require: true, max: 100 },
  documents: [
    {
      name: {
        type: String,
      },
      reference: {
        type: String,
      },
      _id: false,
    },
  ],
  last_connection: { type: Date, default: Date.now },
})

export const userModel = mongoose.model(userCollection, userSchema)
