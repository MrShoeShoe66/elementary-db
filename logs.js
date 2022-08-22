const fs = require('fs')

module.exports = {}

enableLoging = true

module.exports.append = (logLine) => {
    if (!enableLoging) return
    fs.appendFile('edblogs.txt', logLine + '\n', (err) => {
        if (err) {
        console.log(err)
        }
    })
}
