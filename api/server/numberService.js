var Promise = require("promise");
var https = require("https");

function NumberService(key) {
    var self = this;
    var ATTEMPTS_MAX = 10;
    var options = {
            host: "numbersapi.p.mashape.com",
            
            headers: {
                'Content-Type': 'application/json',
                'X-Mashape-Key': key,
                'Accept': 'application/json'
            }
        }
    this.getNumberFact = function(blackList) {
        blackList = blackList? []: blackList;
        var number = Math.floor(Math.random() * 1000);
        options.path =  "/" + number + "/math";
        return new Promise(function(resolve, reject) {
            https.get(options, function(res){
                var body = '';
                res.on('data', function(d) {
                    body += d;
                }).on('end', function(){
                    var parsed = JSON.parse(body);
                    if(parsed.found && blackList.indexOf(parsed.number) < 0){
                        parsed.text = sanitize(parsed.text, parsed.number);
                        resolve(parsed);
                    }else {
                        console.warn("Boring number recieved: Requesting another, more interesting one");
                        self.getNumberFact(blackList).then(resolve).catch(reject);
                    }
                });
            }).on('error', function(e){
                reject("500", e);
            });
        });
    }
    
    this.getNewClue = function(number,prev,attempts) {
        return new Promise(function(resolve, reject) {
            attempts = attempts === undefined? 0: attempts;
            https.get(options, function(res){
                var body = '';
                res.on('data', function(d) {
                    body += d;
                }).on('end', function(){
                    var parsed = JSON.parse(body);
                    parsed.text = sanitize(parsed.text, parsed.number);
                    if(prev.indexOf(parsed.text)){
                        resolve(parsed);
                    }else if(attempts < self.ATTEMPTS_MAX){
                        console.warn("Dulicate Clue retrying");
                        self.getNumberFact(number,prev,attempts+1).then(resolve).catch(reject);
                    }else {
                        resolve(false);
                    }
                });
            }).on('error', function(e){
                reject("500", e);
            });
        });
    }
       
    function sanitize(raw, number) {
   	    var reg = new RegExp('\\b' + number + '\\b','g');
		var s =  raw.replace(reg, 'It');
        return s;
    }
}

module.exports = NumberService;
