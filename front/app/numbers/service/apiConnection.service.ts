import {Injectable} from 'angular2/core';

@Injectable()
export class ApiConnectionService {
    constructor() { }

    getHost() {
        return "number-funk.herokuapp.com/api"
    }
}