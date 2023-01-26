const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later"
  }

  if (err.code && err.code === 11000) {
    const keyValue = Object.keys(err.keyValue)
    customError.message = `Duplicate value entered for ${keyValue} field, please choose another value`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({ message: customError.message })
}

module.exports = errorHandlerMiddleware
