module.exports = function(RED) {
    function InstanceClient(n) {
        // Node  to create the shared connection to Mastodon
        RED.nodes.createNode(this,n);
        this.api_url = n.apiurl;
        this.access_token = this.credentials.accesstoken;
        var megalodon = require('megalodon');

        this.client = megalodon.default('mastodon', this.api_url, this.access_token);
    }
    RED.nodes.registerType(
        "fediverse-instance",
        InstanceClient,
        {
            credentials: {
                accesstoken: {
                    type: "password"
                }
            }
        }
    );
}