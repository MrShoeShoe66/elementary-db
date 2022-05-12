var http = require('http')
var { Database } = require('./base')

const verifyServer = ( host ) => {
  const request = new XMLHttpRequest();
  const url = `http`
  request.open( "GET", url, false );
  request.send( null );
  if (xmlHttp.status == 200) {
    return true
  } else {
    return false
  }

}

class remoteServer {
  constructor(filename) {
    this.db = new Database(filename)
    this.server = http.createServer(function (req, res) {  
      if (req.type === 'GET') {
        if (req.url == '/db/') {
          res.writeHead(200, {
            'Content-Type': 'text/json'
          }); 
          res.write(
            JSON.stringify(
              this.db.getAll()
            )
          );
          res.end();
        } else if (req.url === '/has/') {
          res.writeHead(200, {
              'Content-Type': 'text/json'
            }); 
            res.write(
              JSON.stringify(
                {
                  'has': this.db.has(
                    req.url.substring(5)
                  )
                }
              )
            );
        } else if (req.url === '/verify') {
          res.writeHead(200, {
            'Content-Type': 'text/json'
          }); 
          res.write(
            JSON.stringify(
              {}
            )
          );
          res.end();
        }
      } else if (req.type === 'POST') {
        if (req.url == '/db/') {
          this.db.setAll(JSON.parse(req.body))
          res.writeHead(200, {
            'Content-Type': 'text/json'
          }); 
          res.write(
            JSON.stringify(
              {}
            )
          );
          res.end();
        } else {
          if (this.db.has(req.url.substring(4))) {
            this.db.set(
              req.url.substring(1), 
              req.body
            )
            res.writeHead(200, {
              'Content-Type': 'text/json'
            }); 
            res.write(
              JSON.stringify(
                {}
              )
            );
            res.end();
          } else {
            res.writeHead(404, {
              'Content-Type': 'text/text'
            }); 
            res.end('Invalid Request!');
          }
        }
      } else if (req.type === 'DELETE') {
        try {
          this.db.del(req.url.substring(4))
          res.writeHead(200, {
            'Content-Type': 'text/json'
          }); 
          res.write(
            JSON.stringify(
              {}
            )
          );
          res.end()
        } catch {
          res.writeHead(500, {
            'Content-Type': 'text/json'
          }); 
          res.end('Invalid Request!')
        }
      }
    });
  }

  start() {
    this.server.listen(1324)
  }
}

class remoteClient {
  constructor() {}
}

module.exports = {
  remoteClient,
  remoteServer,
  verifyServer
}
