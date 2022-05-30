const fs = require('fs')
const fileFormat = require('./fileFormat')
const edbConfig = require('./edb')

class Database {
  constructor(filename, useOld) {
    this.filename = filename + edbConfig.extenion
    try {
      const file = fileFormat.read(this.filename, useOld)
      this.content = file['data']
      this.config = file['config']
      if (this.config = undefined) {
        this.config = {
          'autosave': true
        }
      }
    } catch {
      this.content = {}
      this.save()
      this.config = {
        'autosave': true
      }
    }
  }

  setFile(newFilename) {
    this.filename = newFilename
  }
  
  configure(configValue, newConfig) {
    this.config[JSON.stringify(configValue)] = newConfig
  }
  
  save() {
    const data = fileFormat.gen(this.content, this.config)
    fs.writeFile(this.filename, JSON.stringify(data), (err) => {
      if (err) {
        process.stdout.write(err)
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
    Database
}