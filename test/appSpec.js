var app = require('../app.js');
var appData = require('../savedJobs.json');
var expect = require('chai').expect;


describe('Testing of the api', function() {

    it('Gets job ids', function() {
        var jobIds = app.requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json');
        expect(jobIds).to.not.be.an('undefined');
    });

    it('Gets job info', function() {
        var jobIds = app.requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json');
        return jobIds.then(function(data) {
            expect(app.getJobData(data)).to.not.be.an('undefined');
        });
    });

    it('Gets all the jobs ', function() {
        var jobIds = app.requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json').then(function(data){
            return data;
        });
        var jobs = app.requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json').then(function(data){
            return app.getJobData(data);;
        });
        expect(jobIds.length).to.equal(jobs.length);
    });
});

describe('Tests for saving user\'s jobs', function() {
    it('Saves the selected jobs', function() {

    });
});
