export interface MConfiguration {
    port: number
    ngrok: MNgrok

    isValidConfiguration(): boolean
}

export class Configuration implements MConfiguration {
    port: number;
    ngrok: MNgrok

    constructor(port: number, ngrok: MNgrok) {
        this.port = port;
        this.ngrok = ngrok
    }

    isValidConfiguration(): boolean {
        return true
    }
}

export interface MNgrok {
    authToken: string
    tunnels: MTunnel[]

    isValidNgrok(): boolean
}

export class Ngrok implements MNgrok {
    authToken: string;
    tunnels: MTunnel[];

    constructor(authToken: string, tunnels: MTunnel[]) {
        this.authToken = authToken;
        this.tunnels = tunnels;
    }

    isValidNgrok(): boolean {
        return true
    }
}

export interface MTunnel {
    proto: 'http' // add others protocol
    addr: number
    region: 'sa' // add others regions
    subdomain: string

    isValidTunnel(): boolean
}

export class Tunnel implements MTunnel {
    addr: number;
    proto: 'http';
    region: 'sa';
    subdomain: string;

    constructor(addr: number, proto: 'http', region: 'sa', subdomain: string) {
        this.addr = addr;
        this.proto = proto;
        this.region = region;
        this.subdomain = subdomain;
    }

    isValidTunnel(): boolean {
        return true
    }
}
