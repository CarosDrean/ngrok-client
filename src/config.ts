import fs from 'fs'

import {Configuration, Tunnel, Tunnels} from "./model/configuration";

const path = './configuration.json'

export class Config {
    static getConfiguration(): Configuration {
        try {
            const rawData = fs.readFileSync(path)
            const configJSON: Configuration = JSON.parse(rawData.toString())

            return {
                authToken: configJSON.authToken,
                tunnels: Config.makeTunnels(configJSON.tunnels)
            }
        } catch (e) {
            console.log('error al leer el json: ', e)
            process.exit()
        }
    }

    // this is util for make correct tunnels
    static makeTunnels(tunnels: Tunnels): Tunnels {
        const newTunnels: Tunnels = []
        tunnels.forEach(tunnel => {
            const newTunnel: Tunnel = {
                proto: tunnel.proto,
                addr: tunnel.addr,
                subdomain: tunnel.subdomain,
                region: tunnel.region
            }
            newTunnels.push(newTunnel)
        })

        return tunnels
    }
}
