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

var delay = 30 * 60 * 1000;

log.info("Starting...");
dynDns.listRecords();
dynDns.updateRecords();

// Use setInterval so the process does not exit
setInterval(function() {
  log.info('Running check...');
  dynDns.listRecords();
  dynDns.updateRecords();
}, delay);
