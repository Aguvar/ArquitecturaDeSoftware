class InvalidPayloadError extends Error {
  constructor (message) {
    super(message)
  }
}

module.exports = InvalidPayloadError
