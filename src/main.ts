import {Config} from "./config";
import {UtilError} from "./model/error";
import {Tunnel} from "./tunnel";

class Main {
    async main(): Promise<string> {
        const config = Config.getConfiguration()

        const tunnel = new Tunnel()
        const [urls, error] = await tunnel.enabledTunnelsByConfig(config)
        if (!UtilError.isVoidError(error)) {
            console.log(error) // if need inline add stringify
            process.exit()
        }

        console.log('URLS:')
        urls.forEach(url => {
            console.log(url)
        })

        return 'all correct'
    }


}

new Main().main().then(r => console.log(r))
