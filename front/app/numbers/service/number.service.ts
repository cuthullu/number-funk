import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Round} from '../model/round';


@Injectable()
export class NumberService {
    constructor(private http: Http) { }

    requestClue(round: Round) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-Mashape-Key', 'Tkvkv3nGSJmshbKhgWUUMoaZ55Byp1pDVAwjsnaAaDNRhrIWic');
        headers.append('Accept', 'application/json');
        this.http.get('https://numbersapi.p.mashape.com/' + round.number + '/math',{headers: headers})
            .subscribe(
            data => { 
                var json = data.json();
                if (json.found) { 
                    round.addClue(json) }
                else {
                    round.resetRound();
                    this.requestClue(round)
                }
            },
            err => console.error(err),
            () => console.log("Clue request done")
            );
    }
}