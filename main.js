const ngrok = require('ngrok');

(async function() {
    const url = await ngrok.connect({
        configPath: './ngrok.yml',
        onLogEvent: data => {
            console.log(data)
        },
    });
    console.log(url)
    const api = ngrok.getApi();
    const tunnels = await api.listTunnels();
    console.log(tunnels)
})();
