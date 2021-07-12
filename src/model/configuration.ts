export interface Configuration {
    authToken: string
    tunnels: Tunnels
}

export interface Tunnel {
    proto: 'http' // add others protocol
    addr: number
    region: 'sa' // add others regions
    subdomain: string
}

export type Tunnels = Tunnel[]
