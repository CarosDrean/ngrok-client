import ngrok from "ngrok";

import {Configuration} from "./model/configuration";
import {UtilError, Error} from "./model/error";
import {Option, Options} from "./model/model";

export class Tunnel {
    async enabledTunnelsByConfig(config: Configuration): Promise<[string[], Error]> {
        const options = this.makeOptions(config)

        const urls: string[] = []
        for (const option of options) {
            try {
                const url = await ngrok.connect(option);
                urls.push(url)
            } catch (e) {
                const error: Error = {
                    status: 500,
                    error: JSON.stringify(e.body),
                    message: 'there was an error trying to connect',
                    data: JSON.stringify(option),
                }

                return [[], error]
            }
        }

        return [urls, UtilError.voidError()]
    }

    private makeOptions(config: Configuration): Options {
        const options: Options = []
        config.tunnels.forEach(tunnel => {
            const option: Option = {
                proto: tunnel.proto,
                addr: tunnel.addr,
                subdomain: tunnel.subdomain,
                authtoken: config.authToken,
                region: tunnel.region,
            }

            options.push(option)
        })

        return options
    }
}
