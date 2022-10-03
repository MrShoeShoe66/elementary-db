/*
  In Development, Come back soon!

  To inquire on helping, email me at:
    mrshoeshoe66@gmail.com
  or visit the ./CREDIT.md file
*/

const http = require('http')
const https = require('https')
const util = require('util');
const fs = require('fs');

const { Database } = require('#base/index')
const IP = require('#tools/ip')
const edb = require('../edb')
const logs = require('#tools/logs')
const requests = require('#remote/requests')

class RemoteServer {
  constructor(settings) {
    this.settings = settings
    logs.append('Created Remote Server at IP: ' + IP() + ' on version ' + edb.remote.server.version)
  }

  createServer() {
    const db = new Database('remote')
    db.configure('dontsave', true)
    logs.append('Started a Remote Server at timestamp of ' + Date.now())
    this.server = http.createServer(function (req, res) {
      if (req.method !== "POST") {
        return res.end()
      }
      res.setHeader('Content-Type', 'json/application')
      req.on('data', function(chunk) {
        var body = JSON.parse(chunk)
        logs.append('Recieved data from: ' + req.connection.remoteAddress + ' with data: ' + JSON.stringify(body) + ' at timestamp of: ' + Date.now() + " with the type: " + body['type'])
        if (body.type === 'online') {
          res.write(JSON.stringify({
            type: "online",
            'data': true,
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'get') {
          res.write(JSON.stringify({
            type: "get",
            'data': db.get(body.key),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'set') {
          res.write(JSON.stringify({
            type: "set",
            'data': db.set(body.key, body.value),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'delete') {
          res.write(JSON.stringify({
            type: "delete",
            'data': db.del(body.value),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'has') {
          res.write(JSON.stringify({
            type: "has",
            'data': db.has(body.value),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'keys') {
          res.write(JSON.stringify({
            type: "keys",
            'data': db.keys(),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'getAll') {
          res.write(JSON.stringify({
            type: "getAll",
            'data': db.getAll(),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'setAll') {
          db.setAll(body.value)
          res.write(JSON.stringify({
            type: "setAll",
            'data': {},
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        }
        res.end()
      })
    })

    return this
  }

  createServerSecure(key, cert) {
    const options = {
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert)
    };

    const db = new Database('remote')
    db.configure('dontsave', true)
    logs.append('Started a Secure Remote Server at timestamp of ' + Date.now())
    
    this.server = https.createServer(options, function (req, res) {
      if (req.method !== "POST") {
        return res.end()
      }
      res.setHeader('Content-Type', 'json/application')
      req.on('data', function(chunk) {
        var body = JSON.parse(chunk)
        logs.append('Recieved data from: ' + req.connection.remoteAddress + ' with data: ' + JSON.stringify(body) + ' at timestamp of: ' + Date.now() + " with the type: " + body['type'])
        if (body.type === 'online') {
          res.write(JSON.stringify({
            type: "online",
            'data': true,
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'get') {
          res.write(JSON.stringify({
            type: "get",
            'data': db.get(body.key),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'set') {
          res.write(JSON.stringify({
            type: "set",
            'data': db.set(body.key, body.value),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'delete') {
          res.write(JSON.stringify({
            type: "delete",
            'data': db.del(body.value),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'has') {
          res.write(JSON.stringify({
            type: "has",
            'data': db.has(body.value),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'keys') {
          res.write(JSON.stringify({
            type: "keys",
            'data': db.keys(),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'getAll') {
          res.write(JSON.stringify({
            type: "getAll",
            'data': db.getAll(),
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        } else if (body.type === 'setAll') {
          db.setAll(body.value)
          res.write(JSON.stringify({
            type: "setAll",
            'data': {},
            meta: {
              version: edb.remote.server.version,
              offical: edb.remote.server.offical
            }
          }))
        }
        res.end()
      })
    })

    return this
  }

  start() {
    this.server.listen(312, () => {
      console.log(`elementary-db database server running at ip of: ${IP()}`)
    })
  }

  [util.inspect.custom]() {
    return 'This is remote elementary-db Database server object, why are you printing this?'
  }
  
  debugPrint() {
    console.table(this)
  }
}

class RemoteClient {
  constructor(server, settings) {
    this.address = server
    this.https = settings?.secure || false
    if (this.https === true) {
      this.reqfunc = this.reqfuncHttps
    } else {
      this.reqfunc = this.reqfunc
    }
    this.verifyServer()
  }

  async checkServerStatus() {
    try {
      return await this.reqfunc(this.server, {
        "type": "online"
      })['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      return false
    }
  }

  async verifyServer() {
    if (await !this.checkServerStatus()) {
      throw 'The server entered is invalid or offline!'
    }
  }

  async get(key) {
    try {
      return JSON.parse(await this.reqfunc(this.server, {
        "type": 'get',
        "key": key
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async set(key, value) {
    try {
      return await JSON.parse(this.reqfunc(this.server, {
        "type": 'set',
        "key": key,
        "value": value
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async delete(key) {
    try {
      return await JSON.parse(this.reqfunc(this.server, {
        "type": 'delete',
        "key": key
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async has(key) {
    try {
      return JSON.parse(await this.reqfunc(this.server, {
        "type": 'has',
        "key": key
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async keys() {
    try {
      return JSON.parse(await this.reqfunc(this.server, {
        "type": 'keys'
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async getAll() {
    try {
      return JSON.parse(await this.reqfunc(this.server, {
        "type": 'getAll'
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async setAll(data) {
    try {
      return await JSON.parse(this.reqfunc(this.server, {
        "type": 'setAll',
        "value": data
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  [util.inspect.custom]() {
    return 'This is remote elementary-db Database client object'
  }

  debugPrint() {
    console.table(this)
  }
}

module.exports = RemoteClient
module.exports.server = RemoteServer

/*
Format

  Request

  {
    "type": "",
    "key": "",
    "value": ""
  }

  Resonse

  {
    "type": "",
    "data": data,
    "meta": ...
  }
*/