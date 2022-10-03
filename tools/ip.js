const { networkInterfaces } = require('os');

module.exports = function (name, family) {
  const nets = networkInterfaces();
  const results = {}
  
  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          if (net.family === 'IPv4' && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }

  return results["eth0"] || results['Wi-Fi']

}