import fs from 'fs'
import {Error, MError} from "../../model/error";
import {Configuration, MConfiguration, MNgrok, MTunnel, Ngrok, Tunnel} from "../../model/configuration";

const path = './configuration.json'

export class Config {
    static getConfiguration(): MConfiguration {
        try {
            const rawData = fs.readFileSync(path);
            const [config, error] = Config.assemblyConfiguration(JSON.parse(rawData.toString()))

            if (!Error.isVoidError(error)) {
                console.log('error al leer el json: ', error)
                process.exit()
            }

            return config
        } catch (e) {
            console.log('error al leer el json: ', e)
            process.exit()
        }
    }

    private static assemblyConfiguration(mConfig: MConfiguration): [MConfiguration, MError] {
        const [ngrok, error] = Config.assemblyNgrok(mConfig.ngrok)
        if (!Error.isVoidError(error)) {
            return [mConfig, new Error(500, error.error, 'config is invalid', 'assemblyNgrok')]
        }

        const config = new Configuration(mConfig.port, ngrok)
        if (!config.isValidConfiguration()) {
            return [config, new Error(500, 'invalid config', 'config is invalid', 'assemblyConfiguration')]
        }

        return [config, Error.voidError()]
    }

    private static assemblyNgrok(mNgrok: MNgrok): [MNgrok, MError] {
        const [tunnels, error] = Config.assemblyTunnels(mNgrok.tunnels)
        if (!Error.isVoidError(error)) {
            return [mNgrok, new Error(500, error.error, 'config is invalid', 'assemblyTunnels')]
        }

        const ngrok = new Ngrok(mNgrok.authToken, tunnels)
        if (!ngrok.isValidNgrok()) {
            return [mNgrok, new Error(500, 'invalid ngrok', 'field auth is invalid', 'assemblyNgrok')]
        }

        return [ngrok, Error.voidError()]
    }

    private static assemblyTunnels(mTunnels: MTunnel[]): [MTunnel[], MError] {
        const resultsTunnels: MTunnel[] = []
        mTunnels.forEach(mTunnel => {
            const tunnel = new Tunnel(mTunnel.addr, mTunnel.proto, mTunnel.region, mTunnel.subdomain)
            if (!tunnel.isValidTunnel()) {
                return [mTunnels, new Error(500, 'invalid tunnel', 'field auth is invalid', 'assemblyTunnels')]
            }

            resultsTunnels.push(mTunnel)
        })

        return [resultsTunnels, Error.voidError()]
    }
}
