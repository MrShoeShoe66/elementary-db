// Import Normal Database

const {
  Database
} = require('./base')

// INIT Database Function

function initDatabase(filename) {
  return new Database(filename, false)
}

// Export Normal Database && INIT Function

module.exports = Database
module.exports.init = initDatabase

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

// Convert Data

const fileFormat = require('./fileFormat')
const fs = require('fs')

function getContent(filename) {
  const file = fs.readFileSync(filename, 'utf8');
  const formatedFile = file
    .replace(/(\r\n\t|\n|\r\t)/gm,'')
    .replace(/}{/g, '},{');
  const fileJson = JSON.parse(formatedFile)
  return fileJson
}

module.exports.convertToNew = (filename) => {
  const data = getContent(filename)
  const formatedData = fileFormat.gen(data, {})
  const file = filename.split('.')[0] + '.edb'
  fs.writeFile(file, JSON.stringify(formatedData), (err) => {
    if (err) {
      process.stdout.write(err)
    }
  })
}