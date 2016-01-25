var RouteDynDns = require('./routeDynDns');
var schedule = require('node-schedule');
var config = require('./config.json');
var SimpleNodeLogger = require('simple-node-logger'),
opts = {
		logFilePath:'/tmp/node-ddns.log',
		timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
	},
log = SimpleNodeLogger.createSimpleLogger(opts);

var awsAccessKey = config.awsKey;

var awsSecret = config.awsSecret;
var hostedZoneId = config.hostedZoneId;

var domainsToChange = ['cosas.morenware.com.', 'cosas-stage.morenware.com', 'xbmc.morenware.com'];
var dynDns = new RouteDynDns(awsAccessKey, awsSecret, domainsToChange, hostedZoneId, log);

var j = schedule.scheduleJob('* * * * *', function(){
  log.info('Running check...');
  dynDns.listRecords();
  dynDns.updateRecords();
});

if (typeof j !== undefined) {
  log.info("Scheduled DDNS job: ", j);
}
