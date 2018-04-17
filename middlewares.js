import createError from 'http-errors'

const requireToken = async (res, req, next) => {
  try {
    next()
  } catch (e) {
    createError(401, e)
  }
}
export default requireToken
