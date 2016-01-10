var app = require('../app.js');
var expect = require('chai').expect;
describe('Testing of the api', function() {
    it('Gets job ids', function() {
        var jobIds = app.requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json');
        expect(jobIds).to.not.be.an('undefined');
    });
    it('Gets job info', function() {
        var jobIds = app.requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json');
        var jobs = app.getJobData;
        expect(jobs).to.not.be.an('undefined');
    });

    it('Gets all the jobs ', function() {
        var jobIds = app.requestPromise('https://hacker-news.firebaseio.com/v0/jobstories.json');
        var jobs = app.getJobData;
        expect(jobIds.length).to.equal(jobs.length);
    });
})
