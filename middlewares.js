import createError from 'http-errors'
import Debug from 'debug'


export const catchExceptions = (middleware) => async (req, res, next) => {
  try {
    await middleware(req, res, next)
  } catch (e) {
    const debug = Debug('ssosta')
    debug('Error happended:', e)
    next(e)
  }
}

export const requireToken = async (req, res, next) => {
  try {
    next()
  } catch (e) {
    createError(401, e)
  }
}
