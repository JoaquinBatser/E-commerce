import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

const sendPassswordChangeEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: 'Password Reset',
    html: `<p>Your password reset link is <a href="http://localhost:5173/passwordChange/${token}"> This one </a> . It has a validity of 1 hour.</p>`,
  }
  try {
    await transport.sendMail(mailOptions)
  } catch (error) {
    console.error(error)
  }
}

const sendDeletedAccount = async (email) => {
  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: 'Account Deletion',
    html: `<p>Your account has been deleted</p>`,
  }
  try {
    await transport.sendMail(mailOptions)
  } catch (error) {
    console.error(error)
  }
}

const sendDeletedProduct = async (email) => {
  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: 'Product Deletion',
    html: `<p>Your product has been deleted</p>`,
  }
  try {
    await transport.sendMail(mailOptions)
  } catch (error) {
    console.error(error)
  }
}

export default {
  sendPassswordChangeEmail,
  sendDeletedAccount,
  sendDeletedProduct,
}
