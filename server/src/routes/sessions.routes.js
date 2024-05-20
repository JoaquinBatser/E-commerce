import { Router } from 'express'
import sessionsController from '../controllers/sessions.controller.js'
import passport from 'passport'
import uploader from '../middlewares/multer.js'

const sessionsRouter = Router()

sessionsRouter.get('/', sessionsController.getUsers)

sessionsRouter.delete('/', sessionsController.deleteOldUsers)

sessionsRouter.delete('/:uId', sessionsController.deleteUser)

sessionsRouter.post(
  '/signup',
  passport.authenticate('signup'),
  sessionsController.signup
)

sessionsRouter.post(
  '/login',
  passport.authenticate('login'),
  sessionsController.login
)

sessionsRouter.post('/logout', sessionsController.logout)

sessionsRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  async (req, res) => {}
)

sessionsRouter.get(
  '/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  sessionsController.githubCallback
)

sessionsRouter.get('/current', sessionsController.currentUser)

sessionsRouter.get(
  '/password/change/:email',
  sessionsController.sendPasswordResetEmail
)
sessionsRouter.put('/password/change/:token', sessionsController.updatePassword)

sessionsRouter.put('/premium/:uId', sessionsController.changeRole)

// Cambio
sessionsRouter.post(
  '/:uId/documents/:docType',
  uploader.single('file'),
  sessionsController.uploadDocument
)

export default sessionsRouter
