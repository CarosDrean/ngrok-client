import ngrok from 'ngrok'
import {Config} from "./config";

async function enabledTunnelsByConfig() {
    const config = Config.getConfiguration()
    const cNgrok = config.ngrok

    const tunnels = cNgrok.tunnels

    for (const tunnel of tunnels) {
        const url = await ngrok.connect({
            proto: tunnel.proto,
            addr: tunnel.addr,
            subdomain: tunnel.subdomain,
            authtoken: cNgrok.authToken,
            region: tunnel.region,
        });

        console.log('url:', url)
    }
}

async function main() {
    try {
        await enabledTunnelsByConfig()
    } catch (e) {
        console.log('error init tunnels:', e)
    }
}

main().then(r => console.log(r))
