module.exports = function (RED) {
  function StreamingNode (config) {
    RED.nodes.createNode(this, config)
    var node = this
    this.instance = RED.nodes.getNode(config.instance)
    var client = this.instance.client
    client
      .publicStreaming()
      .then(stream => {
        stream.on('connect', () => {
          node.status({ fill: 'green', shape: 'dot', text: 'connected' })
        })

        stream.on('update', status => {
          node.send({ payload: status, topic: 'update' })
        })

        stream.on('notification', notification => {
          console.log(notification)
          node.send({ payload: notification, topic: 'notification' })
        })

        stream.on('delete', id => {
          console.log(id)
          node.send({ payload: id, topic: 'delete' })
        })

        stream.on('error', err => {
          console.log(err)
        })

        stream.on('heartbeat', () => {
          node.log('thump.')
        })

        stream.on('close', () => {
          node.status({ fill: 'red', shape: 'ring', text: 'disconnected' })
        })

        stream.on('parser-error', err => {
          node.error(err)
        })
      })
      .catch(err => {
        node.error(err)
        node.status({ fill: 'red', shape: 'dot', text: err.message })
      })
  }
  RED.nodes.registerType('streaming', StreamingNode)
}
