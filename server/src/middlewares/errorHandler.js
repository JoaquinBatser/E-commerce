import { logger } from '../logger.js'
import CustomError from '../services/CustomError.js'
export default function errorHandler(error, req, res, next) {
  logger.error(error.message)
  if (error instanceof CustomError) {
    return res
      .status(error.status)
      .json({ message: error.message, success: false, cause: error.cause })
  }
  return res.status(500).json({
    message: 'Something went wrong',
    success: false,
    cause: error.message,
  })
}
