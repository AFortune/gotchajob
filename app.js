var request = require('request');
var async = require('async');
var jobIds = [];
var jobData = [];
request('https://hacker-news.firebaseio.com/v0/jobstories.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
      jobIds = JSON.parse(body);
      jobIds.forEach(function(value) {
          request('https://hacker-news.firebaseio.com/v0/item/'+ value +'.json', function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  jobData.push(JSON.parse(body));
              }
          });
      });
      console.log(jobData);
      jobData.forEach(function(value) {
          var p = document.createElement('p');
          p.textContent = value.toString();
          document.body.appendChild(p);
      });
  }
});
