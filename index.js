// Import Normal Database

const {
  Database,
  getContent
} = require('./base')

// INIT Database Function

function initDatabase(filename) {
  return new Database(filename)
}

// Export Normal Database && INIT Function

module.exports = Database
module.exports.init = initDatabase

// Export getContent to replace data

module.exports.getFile = getContent

// Import Array Database 

const {
  arrayDatabase
} = require('./array')

// Export Array Database

module.exports.array = arrayDatabase

// Import Remote 

const {
  remoteClient,
  remoteServer,
  verifyServer
} = require('./remote')

// Export Remote

module.exports.remote = remoteClient
module.exports.remote.server = remoteServer
module.exports.remote.verify = verifyServer