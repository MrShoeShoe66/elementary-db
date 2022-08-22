/*
  In Development, Come back soon!

  To inquire on helping, email me at:
    mrshoeshoe66@gmail.com
  or visit the ./CREDIT.md file
*/

const http = require('http')
const readline = require("readline");

const { Database } = require('./base')
const IP = require('./ip')
const edb = require('./edb')
const logs = require('./logs')
const requests = require('./requests')

class RemoteServer {
  constructor(settings) {
    this.settings = settings
    logs.append('Created Remote Server at IP: ' + IP() + ' on version ' + edb.remote.server.version)
  }

  start() {
    const db = new Database('remote')
    db.configure('dontsave', true)
    logs.append('Started Remote Server at timestamp of ' + Date.now())
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
  this.server.listen(312, () => {
    console.log(`elementary-db database server running at ip of: ${IP()}`)
  })
  }
}

class RemoteClient {
  constructor(server) {
    this.address = server
    this.verifyServer()
  }

  async checkServerStatus() {
    try {
      return await requests.sendReqest(this.server, {
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
      return JSON.parse(await requests.sendReqest(this.server, {
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
      return await JSON.parse(requests.sendReqest(this.server, {
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
      return await JSON.parse(requests.sendReqest(this.server, {
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
      return JSON.parse(await requests.sendReqest(this.server, {
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
      return JSON.parse(await requests.sendReqest(this.server, {
        "type": 'keys'
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async getAll() {
    try {
      return JSON.parse(await requests.sendReqest(this.server, {
        "type": 'getAll'
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }

  async setAll(data) {
    try {
      return await JSON.parse(requests.sendReqest(this.server, {
        "type": 'setAll',
        "value": data
      }))['data']
    } catch (error) {
      logs.append('Client Error: ' + error)
      throw new Error('Error with getting data from server!\nFind the error logs at ./edblogs.txt')
    }
  }
}

module.exports = RemoteClient
module.exports.server = RemoteServer

module.exports.debug = {}
module.exports.debug.sendReqest = requests.sendReqest
module.exports.debug.manualRequest = async function() {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  rl.question("Server IP\n> ", async function(ip) {
      rl.question("TYPE\n> ", async function(type) {
          rl.question("KEY\n> ", async function(key) {
              rl.question("VALUE\n> ", async function(value) {
                  rl.close();
                  console.log(await requests.sendReqest(ip, {
                    "type": type,
                    "key": key,
                    "value": value
                  }))
              });
          });
      });
  });
}

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