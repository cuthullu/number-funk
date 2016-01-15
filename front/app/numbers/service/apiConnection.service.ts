import {Injectable} from 'angular2/core';

@Injectable()
export class ApiConnectionService {
    constructor() { }

    getHost() {
        return "http://192.168.99.100:3003/api"
    }
}