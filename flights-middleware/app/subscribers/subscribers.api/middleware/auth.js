const jwt = require('jsonwebtoken')

module.exports = async function auth (req, res, next) {
  const token = req.headers.auth

  try {
    jwt.verify(token, process.env.APP_SECRET)
  } catch (error) {
    res.status(401).send({ message: error.message })
  }
  next()
}
