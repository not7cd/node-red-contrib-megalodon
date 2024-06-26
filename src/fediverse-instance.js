module.exports = function (RED) {
  function InstanceClient (n) {
    // Node  to create the shared connection to Mastodon
    RED.nodes.createNode(this, n)
    this.kind = n.kind
    this.api_url = n.apiurl
    this.access_token = this.credentials.accesstoken
    
    var megalodon = require('megalodon')
    this.client = megalodon.default(this.kind, this.api_url, this.access_token.trim())
    console.log('Instance client created, API URL: ' + this.api_url)
  }
  RED.nodes.registerType('fediverse-instance', InstanceClient, {
    credentials: {
      accesstoken: {
        type: 'password'
      }
    }
  })
}
