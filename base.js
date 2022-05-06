const fs = require('fs')

function getContent(filename) {
  const file = fs.readFileSync(filename, 'utf8');
  const formatedFile = file
    .replace(/(\r\n\t|\n|\r\t)/gm,'')
    .replace(/}{/g, '},{');
  const fileJson = JSON.parse(formatedFile)
  return fileJson
}

function saveConfig(filename, config) {
  fs.writeFile(filename, config, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

class Database {
  constructor(filename) {
    this.filename = filename
    
    try {
      this.content = getContent(this.filename)
    } catch {
      this.content = {}
      this.save()
    }
    
    this.config = {
      'autosave': true,
      'saveConfig': false,
      'configFile': 'elementary-db.config'
    }
  }

  setFile(newFilename) {
    this.filename = newFilename
  }
  
  configure(configValue, newConfig) {
    this.config[JSON.stringify(configValue)] = newConfig
    if (this.config['saveConfig'] === true) {
      saveConfig(this.config['configFile'], this.config)
    }
  }
  
  save() {
    fs.writeFile(this.filename, JSON.stringify(this.content), (err) => {
      if (err) {
        console.log(err)
      }
    })

  }

  endFunc() {
    if (this.config['autosave'] === true) {
      this.save()
    }
  }
  
  keys() {
    return Object.keys(this.content)
  }

  has(key) {
    if (this.keys().includes(String(key))) {
      return true
    } else {
      return false
    }
  }

  get(key) {
    return this.content[String(key)]
  }

  set(key, content) {
    this.content[String(key)] = content
    this.endFunc()
  }

  del(key) {
    delete this.content[String(key)]
    this.endFunc()
  }

  getAll() {
    return this.content
  }

  setAll(data) {
    this.content = data
  }
}

module.exports = {
    Database,
    getContent
}