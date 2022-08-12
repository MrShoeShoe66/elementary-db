const edbConfig = require('./edb')
const fs = require('fs')

function getContent(filename) {
    const file = fs.readFileSync(filename, 'utf8');
    const formatedFile = file
      .replace(/(\r\n\t|\n|\r\t)/gm,'')
      .replace(/}{/g, '},{');
    const fileJson = JSON.parse(formatedFile)
    return fileJson
  }

const loadFile = (filename, useOld = false) => {
  const content = getContent(`./${filename}`)
  if  (edbConfig.version === content['version']) {
    return {
      data: content['data'],
      config: content['config']
    }
  } else {
    if (useOld) {
      return {
        data: content['data'],
        config: content['config']
      }
    } else {
      throw `Database file is from a diffrent version! That file if from ${content['version']} NOT ${edbConfig.version}, and thats the current verion! Please downgrade or upgrade the version your useing of elementary-db. You CAN use an old file, but data may be corrupted or you may find problems in some tools and utility. to use an old file, add true to the end of the init function.`
    }
  }
}

const formatData  = (Data, Config) => {
  return {
    data: Data,
    config: Config,
    version: edbConfig.version
  }
}

module.exports = {}
module.exports.read = loadFile
module.exports.gen = formatData