const { Error } = require('mongoose');

class UnaccurateDateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = UnaccurateDateError;
