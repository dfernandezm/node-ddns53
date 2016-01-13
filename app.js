var RouteDynDns = require('./routeDynDns');
var schedule = require('node-schedule');
var config = require('./config.json');

var awsAccessKey = config.awsKey;
var awsSecret = config.awsSecret;
var hostedZoneId = config.hostedZoneId;

var domainsToChange = ['videos.morenware.com.'];
var dynDns = new RouteDynDns(awsAccessKey, awsSecret, domainsToChange, hostedZoneId);

var j = schedule.scheduleJob('* */6 * * *', function(){
  dynDns.updateRecords();
});

if (typeof j !== undefined) {
  console.log("Scheduled job", j);
}
