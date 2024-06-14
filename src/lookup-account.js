var megalodon = require('megalodon')

module.exports = function (RED) {
  function LookupAccountNode (config) {
    RED.nodes.createNode(this, config)
    var node = this
    this.instance = RED.nodes.getNode(config.instance)
    var client = megalodon.default(
      'mastodon',
      this.instance.api_url,
      this.instance.access_token
    )
    node.on('input', function (msg) {
      var post = msg.payload
      client
        .lookupAccount(post)
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
