import passport from 'passport'
import GithubStrategy from 'passport-github2'
import usersManager from '../services/db/users.service.db.js'
import dotenv from 'dotenv'
import { userModel } from '../models/user.model.js'
import repositories from '../repositories/index.js'

dotenv.config()
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL

const userManager = new usersManager(repositories.users)

// Cambio nombre
const initializeGHPassport = () => {
  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({
            email: profile?.emails[0]?.value,
          })
          if (user) {
            done(null, user)
          } else {
            const newUser = await userModel.create({
              first_name: profile.displayName.split(' ')[0],
              last_name: profile.displayName.split(' ')[1],
              email: profile?.emails[0]?.value,
              age: 18,
              password: Math.random().toString(36).substring(7),
            })
            done(null, newUser)
          }
        } catch (error) {
          console.log(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userManager.getUserById(id)
      done(null, user)
    } catch (error) {
      console.log(error)
    }
  })
}

export default initializeGHPassport
