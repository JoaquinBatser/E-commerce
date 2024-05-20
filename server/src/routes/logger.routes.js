import { Router } from 'express'
import { logger } from '../logger.js'

const loggerRouter = Router()

loggerRouter.get('/', (req, res) => {
  logger.fatal('fatal')
  logger.error('error')
  logger.warning('warning')
  logger.info('info')
  logger.http('http')
  logger.debug('debug')
  res.status(200).send('Logs printed')
})

export default loggerRouter
