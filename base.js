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
    return this.keys().includes(String(key))
  }

  get(key) {
    return this.content[String(key)]
  }

  set(key, content) {
    this.content[String(key)] = content
    this.endFunc()
    return this.get(key)
  }

  del(key) {
    delete this.content[String(key)]
    this.endFunc()
    return !this.has(key)
  }

  getAll() {
    return this.content
  }

  setAll(data) {
    this.content = data
    return this.getAll()
  }

  getConfig(value) {
    return this.config[value]
  }
}

module.exports = {
  Database
}