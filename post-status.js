var megalodon = require('megalodon');

module.exports = function(RED) {
    function PostStatusNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var BASE_URL = 'https://mastodon.social';
        var access_token = '...'; // replace with your access token
        var client = megalodon.default('mastodon', BASE_URL, access_token);

        node.on('input', function(msg) {
            var post = msg.payload.toLowerCase();
            client.postStatus(post)
                .then(function(res) {
                    console.log(res.data);
                    msg.payload = res.data;
                    node.send(msg);
                })
                .catch(function(error) {
                    console.error(error);
                });
        });
    }
    RED.nodes.registerType("post-status",PostStatusNode);
}