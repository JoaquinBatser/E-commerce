import UsersManager from '../services/db/users.service.db.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { loginValidator } from '../validation/loginValidator.js'
import { signupValidator } from '../validation/signupValidator.js'
import UsersRepository from '../repositories/users.repository.js'
import { userModel } from '../models/user.model.js'
import repositories from '../repositories/index.js'

// const usersRepository = new UsersRepository(userModel)
// const userManager = new UsersManager(usersRepository)
const userManager = new UsersManager(repositories.users)

// Cambio: creamos funcion y se ejecuta en app.js
const initializePassport = () => {
  const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }

  const signup = async (req, email, password, done) => {
    try {
      const userManagerResponse = await userManager.addUser(req.body)

      return done(null, userManagerResponse.user, {
        message: userManagerResponse.message,
        success: userManagerResponse.success,
      })
    } catch (error) {
      console.log(error)
      return done(error)
    }
  }

  const login = async (req, email, password, done) => {
    try {
      const user = { email, password }
      console.log('asdasdfadsf')
      const userManagerResponse = await userManager.loginUser(user)
      if (userManagerResponse.success) {
        req.session.userId = userManagerResponse.foundUser._id // Add the user ID to the session
      }

      return done(null, userManagerResponse.foundUser, {
        message: userManagerResponse.message,
        success: userManagerResponse.success,
      })
    } catch (error) {
      console.log(error)
      return done(error)
    }
  }

  const signupStrategy = new LocalStrategy(strategyOptions, signup)
  const loginStrategy = new LocalStrategy(strategyOptions, login)

  passport.use('signup', signupStrategy)
  passport.use('login', loginStrategy)
}

export default initializePassport
