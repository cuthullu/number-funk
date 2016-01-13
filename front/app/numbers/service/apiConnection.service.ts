import {Injectable} from 'angular2/core';

@Injectable()
export class ApiConnectionService {
    constructor(private http: Http) { }

    getHost() {
        return "localhost:3003/api/"
    }
}