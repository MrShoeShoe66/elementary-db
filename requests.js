const http = require('http');

module.exports = {}

module.exports.sendReqest = (url, data) => {
    const options = {
        hostname: url,
        port: 312,
        path: '',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            var output = ''
            res.on('data', (d) => {
                output += d.toString()
            })

            res.on('end', () => {
                resolve(output)
            })

            res.on('error', (err) => {
                reject(err)
            })
        })
        req.write(JSON.stringify(data))
        req.end()
    })
}