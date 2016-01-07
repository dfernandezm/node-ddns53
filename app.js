var RouteDynDns = require('./routeDynDns');

var awsAccessKey = "the one without slash /";
var awsSecret = "this thing/another thing";
var hostedZoneId = "another ID";

var domainsToChange = ['videos.morenware.com.'];
var dynDns = new RouteDynDns(awsAccessKey, awsSecret, domainsToChange, hostedZoneId);

dynDns.updateRecords();
