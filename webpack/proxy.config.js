const os = require('os')

// 获取本机ip
function getIP() {
  const interfaces = os.networkInterfaces()
  let addresses = []
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
      let address = interfaces[k][k2]
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }
  return addresses[0]
}

const ip = getIP(0) || 'localhost'

module.exports = {
  ip: ip,
  domain: `http://${ip}`,
  port: '7777'
}