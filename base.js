const fs = require('fs')

const fileFormat = require('./fileFormat')
const edbConfig = require('./edb')
const encryption = require('./encryption')

class Database {
  constructor(filename, settings) {
    this.filename = filename + edbConfig.extenion
    try {
      this.key = settings['encryptedKey']
    } catch {}
    try {
      const file = fileFormat.read(this.filename, settings['useOld'])
      if (settings['encrypted']) {
        this.content = JSON.parse(
          encryption.decrypt(
            file.data,
            this.key
          )
        )
      } else {
        this.content = file['data']
      }
      this.config = file['config']
      if (this.config === undefined) {
        this.config = {
          'autosave': true,
          'dontsave': false,
          'encrypted': false
        } 
      }
    } catch {
      this.content = {}
      this.config = {
        'autosave': true,
        'dontsave': false,
        'encrypted': false
      }
    }
  }

  setFile(newFilename) {
    this.filename = newFilename
  }

  configure(configValue, newConfig) {
    this.config[configValue] = newConfig
  }

  save() {
    if (this.config['dontsave'] === true) {
      fs.exists(this.filename, (exists) => {
        if (exists) {
          fs.unlinkSync(this.filename)
        }
      })
      return
    }
    var data = fileFormat.gen(
      this.content,
      this.config
    )
    if (this.config['encrypted']) {
      data = fileFormat.gen(
        encryption.encrypt(
          JSON.stringify(this.content),
          this.key
        ),
        this.config
      )
    }
    fs.writeFile(
      this.filename,
      JSON.stringify(data),
      (err) => {
        if (err) {
          process.stdout.write(err)
        }
    })
  }

  endFunc() {
    if (this.config['autosave']) {
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