var RouteDynDns = require('./routeDynDns');
var schedule = require('node-schedule');
var config = require('./config.json');

var awsAccessKey = config.awsKey;

var awsSecret = config.awsSecret;
var hostedZoneId = config.hostedZoneId;

var domainsToChange = ['cosas.morenware.com.', 'cosas-stage.morenware.com', 'xbmc.morenware.com'];
var dynDns = new RouteDynDns(awsAccessKey, awsSecret, domainsToChange, hostedZoneId);

var j = schedule.scheduleJob('* * * * *', function(){
  console.log("Running at ", new Date());
  dynDns.listRecords();
  dynDns.updateRecords();
});

if (typeof j !== undefined) {
  console.log("Scheduled job", j);
}
