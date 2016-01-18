import {Injectable} from 'angular2/core';

@Injectable()
export class ApiConnectionService {
    constructor() { }

    getHost() {
        return "http://127.0.0.1:3003/api"
    }
}