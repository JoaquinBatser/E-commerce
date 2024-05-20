import winston, { addColors } from 'winston'
const { combine, simple, colorize, timestamp } = winston.format
import dotenv from 'dotenv'

dotenv.config()

const MODE = process.env.MODE
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'magenta',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white',
  },
}

addColors(customLevels.colors)

const devLogger = winston.createLogger({
  level: 'debug',
  levels: customLevels.levels,
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    simple()
  ),
  transports: [new winston.transports.Console()],
})

const prodLogger = winston.createLogger({
  level: 'info',
  levels: customLevels.levels,
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './errors.log' }),
  ],
})

export const logger = MODE === 'DEV' ? devLogger : prodLogger
