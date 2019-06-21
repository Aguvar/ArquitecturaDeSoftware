
module.exports = async function errorMiddleware (error, req, res, next) {
  if (error instanceof Error) {
    res.status(404).send()
    // TODO: Think about error handling here
  }
  next()
}
