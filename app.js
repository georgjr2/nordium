import createError from 'http-errors'
import express from 'express'
import Handlebars from 'hbs'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './routes'
import usersRouter from './routes/users'
import header from './views/header'

const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
Handlebars.registerHelper('ifCond', (v1, oper, v2, options) => {
  if (String(v1) === String(v2)) {
    return options.fn(this)
  }
  return options.inverse(this)
})

Handlebars.registerPartial('header', header)


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// Error handler
app.use((err, req, res) => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
