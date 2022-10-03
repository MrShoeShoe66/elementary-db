// Import Normal Database

const {
  Database
} = require('#base/index')

// INIT Database Function

function initDatabase(filename) {
  return new Database(filename, false)
}

// Export Normal Database && INIT Function

module.exports = Database
module.exports.init = initDatabase

// Convert Data

const fileFormat = require('#tools/fileFormat')
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

// Remote Database

module.exports.remote = require('#remote/index')