import repositories from '../repositories/index.js'
import UsersManager from '../services/db/users.service.db.js'
import mailing from '../middlewares/mailing.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const usersManager = new UsersManager(repositories.users)

const getUsers = async (req, res, next) => {
  try {
    const users = await usersManager.getUsers()
    if (!users.success) {
      res.json({
        success: false,
        message: 'Could not find users',
      })
    } else {
      res.json({
        success: true,
        message: 'Users found',
        users: users.users,
      })
    }
  } catch (error) {
    next(error.message)
  }
}

const signup = async (req, res, next) => {
  try {
    const id = req.session.passport.user
    const user = await usersManager.getUserById(id)
    if (!user.success) {
      res.json({
        success: false,
        message: 'User already exists',
        session: req.session,
      })
    } else {
      res.json({
        success: true,
        message: 'User created',
        user: user.user,
        session: req.session,
      })
    }
  } catch (error) {
    console.log(error.message)

    next(error.message)
  }
}

const login = async (req, res, next) => {
  try {
    const id = req.session.passport.user
    await usersManager.lastConnection(id)
    const userData = await usersManager.getUserById(id)
    const { password, ...data } = userData.user
    console.log('login')

    if (!userData.success) {
      res.json({
        message: 'User not found',
        success: userData.success,
        session: req.session,
      })
    } else {
      res.json({
        message: 'User logged in',
        user: userData.user,
        success: userData.success,
        session: req.session,
      })
    }
  } catch (error) {
    next(error.message)
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.session.passport.user
    console.log(id)

    await usersManager.lastConnection(id)
    req.session.destroy()
    res.json({
      success: true,
      message: 'User logged out',
    })
  } catch (error) {
    next(error.message)
  }
}

const githubCallback = async (req, res) => {
  req.session.user = req.user
  req.session.admin = true
  res.redirect('/products')
}

const currentUser = async (req, res, next) => {
  try {
    const id = req.session.passport.user
    const user = await usersManager.getUserById(id)

    if (!user.success) {
      res.json({
        success: false,
        message: 'Could not find user',
        session: req.session,
      })
    } else {
      res.json({
        success: true,
        message: 'User found',
        user: user,
        session: req.session,
      })
    }
  } catch (error) {
    next(error.message)
  }
}

const sendPasswordResetEmail = async (req, res, next) => {
  const { email } = req.params
  console.log(email)
  try {
    const userData = await usersManager.getByEmail(email)
    console.log(userData)
    if (!userData.success) {
      res.json({
        success: false,
        message: 'Could not find user',
        session: req.session,
      })
    }
    const token = jwt.sign({ isValid: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    await mailing.sendPassswordChangeEmail(email, token)

    res.status(200).json({
      success: true,
      message: 'Email sent',
    })
  } catch (error) {
    next(error.message)
  }
}
const updatePassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { email, newPassword } = req.body

    const user = await usersManager.getByEmail(email)

    const id = user.user._id

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      res.status(401).json({ success: false, message: 'Invalid token' })
    }

    const passwordUpdate = await usersManager.updatePassword(id, newPassword)

    if (!passwordUpdate.success) {
      res
        .status(500)
        .json({ success: false, message: 'Could not update password' })
    }

    res.status(200).json({ success: true, message: 'Password updated' })
  } catch (error) {
    next(error.message)
  }
}

const deleteOldUsers = async (req, res, next) => {
  try {
    const repoResponse = await usersManager.deleteOldUsers()

    repoResponse.forEach((user) => {
      mailing.sendDeletedAccount(user.email)
    })

    res.status(200).json({
      usersDeleted: repoResponse,
    })
  } catch (error) {
    next(error.message)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { uId } = req.params
    const user = await usersManager.getUserById(uId)
    if (!user.success) {
      res.status(400).json({
        success: false,
        message: 'Could not find user',
      })
    }
    await usersManager.deleteUser(uId)
    mailing.sendDeletedAccount(user.user.email)
    res.status(200).json({
      success: true,
      message: 'User deleted',
      user: user.user,
    })
  } catch (error) {
    next(error.message)
  }
}

const changeRole = async (req, res, next) => {
  try {
    const { uId } = req.params
    const { newRole } = req.body
    let identification = false
    let address = false
    let status = false

    const userService = await usersManager.getUserById(uId)

    userService.user.documents.forEach((doc) => {
      if (doc.name === 'identification') {
        identification = true
      }
      if (doc.name === 'address') {
        address = true
      }
      if (doc.name === 'status') {
        status = true
      }
    })

    if (!identification || !address || !status) {
      return res.status(400).json({
        success: false,
        message: 'Could not change role without all documents uploaded',
      })
    }

    const userData = await usersManager.changeRole(uId, newRole)

    if (!userData.success) {
      return res.status(400).json({
        success: false,
        message: 'Could not change role',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Role changed',
      user: userData.user,
    })
  } catch (error) {
    next(error.message)
  }
}

const uploadDocument = async (req, res, next) => {
  try {
    const name = req.params.docType
    const reference = `http://localhost:8000/${req.file.filename}`
    const { uId } = req.params
    const userData = await usersManager.addUserDocuments(uId, name, reference)

    if (!userData.success) {
      res.status(400).json({
        success: userData.success,
        message: userData.message,
      })
    }
    res
      .status(200)
      .json({ success: userData.success, message: userData.message })
  } catch (error) {
    next(error.message)
  }
}

export default {
  getUsers,
  signup,
  login,
  githubCallback,
  currentUser,
  updatePassword,
  sendPasswordResetEmail,
  changeRole,
  uploadDocument,
  logout,
  deleteOldUsers,
  deleteUser,
}
