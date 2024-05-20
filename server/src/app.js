import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import './passport/strategies.js'
import initializeGHPassport from './config/passport.config.js' // Cambio: nombre import
import initializePassport from './passport/strategies.js' // Cambio: nuevo import
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { __dirname } from './utils.js'
import indexRouter from './routes/index.routes.js'
import passport from 'passport'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const DB_URL =
  process.env.DB_URL || 'mongodb://localhost:27017/PracticaIntegradora'
const COOKIESECRET = process.env.SECRET

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'E-comercer API documentation',
      version: '1.0.0',
      description: 'API documentation for the E-comercer project',
      contact: {
        name: 'Joaquin',
      },
      servers: [`http://localhost:${PORT}`],
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
}

const specs = swaggerJsdoc(swaggerOptions)

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
)

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT} 🏃 `)
})

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  },
})

io.on('connection', (socket) => {
  console.log('New client connected')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

app.use(
  session({
    store: MongoStore.create({ mongoUrl: DB_URL, ttl: 1000 * 60 * 60 }),
    secret: COOKIESECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
)

initializeGHPassport()
initializePassport()

app.use(passport.initialize())
app.use(passport.session())

const environment = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log('DataBase Connected')
  } catch (error) {
    console.log(error)
  }
}
environment()

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/', indexRouter)
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(errorHandler)
