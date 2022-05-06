const { Database, getContent } = require('./base')
const { arrayDatabase } = require('./array')

function initDatabase(filename) {
  return new Database(filename)
}

module.exports = Database

module.exports.init = initDatabase

module.exports.getFile = getContent

module.exports.array = arrayDatabase