module.exports = function (RED) {
  function LookupAccountNode (config) {
    RED.nodes.createNode(this, config)
    var node = this
    this.instance = RED.nodes.getNode(config.instance)
    var client = this.instance.client
    node.on('input', function (msg) {
      var finger = msg.payload
      client
        .lookupAccount(finger)
        .then(function (res) {
          console.log(res.data)
          if (res.data.error) {
            node.status({ fill: 'red', shape: 'dot', text: res.data.error })
          }
          msg.payload = res.data
          node.send(msg)
          node.status({
            fill: 'green',
            shape: 'dot',
            text: 'get success'
          })
        })
        .catch(function (error) {
          console.error(error)
          node.status({
            fill: 'red',
            shape: 'dot',
            text: error.response.data.error || error.message
          })
        })
    })
  }
  RED.nodes.registerType('lookup-account', LookupAccountNode)
}
