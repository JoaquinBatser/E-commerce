import { Router } from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const mailRouter = Router()
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

mailRouter.get('/', async (req, res) => {
  let result = await transport.sendMail({
    from: process.env.NODEMAILER_MAIL,
    to: '',
    subject: 'Test',
    html: '<h1>Test</h1>',
  })
  res.status(200).json(result)
})

export default mailRouter
