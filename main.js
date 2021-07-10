const ngrok = require('ngrok');

(async function() {
    const authToken = 'token'

    const urlApiResults = await ngrok.connect({
        proto: 'http',
        addr: 8000,
        subdomain: 'api-results',
        authtoken: authToken,
        region: 'sa',
    });

    const urlApiInventory = await ngrok.connect({
        proto: 'http',
        addr: 8001,
        subdomain: 'api-inventory',
        authtoken: authToken,
        region: 'sa',
    });

    const urlApiMail = await ngrok.connect({
        proto: 'http',
        addr: 2001,
        subdomain: 'api-mail',
        authtoken: authToken,
        region: 'sa',
    });

    console.log(urlApiResults)
    console.log(urlApiInventory)
    console.log(urlApiMail)
})();
