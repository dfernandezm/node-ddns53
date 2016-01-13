var RouteDynDns = require('./routeDynDns');
var schedule = require('node-schedule');

var awsAccessKey = "the one without slash /";
var awsSecret = "this thing/another thing";
var hostedZoneId = "another ID";

var domainsToChange = ['videos.morenware.com.'];
var dynDns = new RouteDynDns(awsAccessKey, awsSecret, domainsToChange, hostedZoneId);

var j = schedule.scheduleJob('* */6 * * *', function(){
  dynDns.updateRecords();
});

if (typeof j !== undefined) {
  console.log("Scheduled job", j);
}
