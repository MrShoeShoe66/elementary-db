const fs = require('fs')

async function checkFile(filename) {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

function getContent(filename) {
  const file = fs.readFileSync(filename, 'utf8');
  const formatedFile = file
    .replace(/(\r\n\t|\n|\r\t)/gm,'')
    .replace(/}{/g, '},{');
  const fileJson = JSON.parse(formatedFile)
  return fileJson
}

function createFile(filename) {
  fs.writeFile(filename, {}, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

class Database {
  constructor(filename) {
    this.filename = filename
    if (checkFile(this.filename)) {
      this.content = getContent(this.filename)
    } else {
      this.content = {}
      createFile(this.filename)
    }
  }

  saveToDisk() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.content))
    } catch (err) {
      console.error(err)
    }
  }

  keys() {
    return Object.keys(this.content)
  }

  has(key) {
    if (key in this.keys()) {
      return true
    } else {
      return false
    }
  }

  get(key) {
    if (this.has(key)) {
      return this.content[key]
    } else {
      return undefined
    }
  }

  set(key, content) {
    this.content[key] = content
  }

  del(key) {
    if (key in this.keys()) {
      this.content[key] = undefined
    } else {
      throw `Key of '${key}' was not found`
    }
  }

  JSON(content = {"": ""}) {
    if (content === {"": ""}) {
      return this.content
    } else {
      this.content = content
    } 
  }
}

function initDatabase(filename) {
  return new Database(filename)
}

module.exports = initDatabase