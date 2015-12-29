var request = require('request');
var Q = require('q');
var gui = require('nw.gui');

console.log(gui);
function requestPromise(url) {
    var deferred = Q.defer();
    request(url, function (error, response, body) {
        (error) ? deferred.reject(error) : deferred.resolve(JSON.parse(body));
    })
    return deferred.promise;
}

function getJobData(value) {
    var array = Q.all(value.map(function(el){// this fixes it but not sure why
        var d = Q.defer();
        request('https://hacker-news.firebaseio.com/v0/item/'+ el +'.json', function (error, response, body) {
            (error) ? d.reject(error) : d.resolve(JSON.parse(body));
        });
        return d.promise;
    }));
    return array;
}

function outputResults(results) {
    var d = Q.defer();
    results.forEach(function(value) {
        var tile = document.createElement('div');
        var title = document.createElement('div');
        var company = document.createElement('div');
        var description = document.createElement('a');

        tile.className = 'jobTile';
        title.className = 'title';
        company.className = 'company';
        description.className = 'description';

        title.innerHTML       = value.title;
        company.innerHTML     = value.by;
        description.innerHTML = value.url;
        description.addEventListener('click', function(evt) {
            gui.Shell.openItem(description.innerHTML);
        },false);

        tile.appendChild(title);
        tile.appendChild(company);
        tile.appendChild(description);

        document.getElementById('container').appendChild(tile);
        
    });
}

requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json')
    .then(getJobData)
    .then(outputResults);

