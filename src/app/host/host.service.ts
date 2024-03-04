import {Injectable} from '@angular/core';
import {Host} from "./host";

@Injectable({
    providedIn: 'root'
})
export class HostService {

    private hosts: Array<Host> = [];

    constructor() {
    }

    addHost(host: Host): void {
        this.hosts.push(host);
    }

    getHosts(): Array<Host> {
        return this.hosts;
    }

    printHosts(): void {
        console.log("Hosts %o", this.hosts);
    }

}
