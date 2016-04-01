var request = require('request');
var Q = require('q');
var gui = require('nw.gui');
var fs = require('fs');


var yourJobs = [];
var compose = function () {
  var fns = arguments;
  return function (result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result);
    }

    return result;
  };
};

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
    var loadingScreen = document.getElementById('loading-screen');
    //loadingScreen.parentElement.removeChild(loadingScreen);

    results.forEach(function(value) {
        var tile        = document.createElement('div');
        var title       = document.createElement('div');
        var company     = document.createElement('div');
        var description = document.createElement('a');
        var checkBox    = document.createElement('div');

        tile.className        = 'jobTile';
        title.className       = 'title';
        company.className     = 'company';
        description.className = 'description';
        checkBox.className    = 'check-box';

        title.innerHTML       = value.title;
        company.innerHTML     = value.by;
        description.innerHTML = value.url;
        description.addEventListener('click', function(evt) {//how could these event functions be refactored to be more functional
            gui.Shell.openItem(description.innerHTML);

        },false);

        checkBox.addEventListener('click', function(evt) {
            this.style.backgroundColor = '#111';
            yourJobs.push(value);
        },false);
        checkBox.addEventListener('dblclick', function(evt) {
            this.style.backgroundColor = '#eee';
        },false);

        tile.appendChild(title);
        tile.appendChild(company);
        tile.appendChild(description);
        tile.appendChild(checkBox);

        document.getElementById('container').appendChild(tile);
        
    });
}

var win =  gui.Window.get();
win.on('close', function() {
  this.hide(); // Pretend to be closed already
    fs.writeFileSync('saveData.json', JSON.stringify(yourJobs));
    this.close(true);
});

//win.close();

requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json')
    .then(getJobData)
    .then(outputResults);

