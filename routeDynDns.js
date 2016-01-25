// Use request Node library and promises (bluebird/Q?) to query the IP from icanhazip
// Use route53 api to change the IP address for the requested domains
// Use node-schedule package to schedule the execution every hour instead of
// using crontab
// Run with Forever and install as system service

var Route53 = require('nice-route53');
var request = require('request-promise');
var _ = require('lodash');
var Promise = require('bluebird');

// Private part
function getPublicIp() {
    // return the promise
    return request('http://icanhazip.com');
}

function updateIpForHostnames(newIp, hostedZoneId, domains, route53, log) {
    // Use async?
    _.each(domains, function (domain, index) {

      var args = {
        zoneId: hostedZoneId,
        name: domain,
        type: 'A',
        ttl: 600,
        values: [
            newIp,
        ]
      };

      route53.setRecord(args).then(function(res) {
        log.info("Successfully set record", res);
      }).catch(function(err) {
        log.error("Error setting record", err);
      });

    });
}

// Constructor
function RouteDynDns(awsAccessKey, awsSecret, domainsToChange, hostedZoneId, log) {

  this.route53 = new Route53({
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecret
  });

  this.route53.setRecord = Promise.promisify(this.route53.setRecord, {context: this.route53});
  this.route53.records = Promise.promisify(this.route53.records, {context: this.route53});

  this.domains = domainsToChange || [];
  this.hostedZoneId = hostedZoneId;
  this.log = log;
}

// Public part
RouteDynDns.prototype.updateRecords = function() {
   this.log.info("About to check changes in public IP for hosted Zone ID ", this.hostedZoneId);
   var self = this;
   getPublicIp().then(function(ipString) {
     self.log.info("The public IP is ", ipString);
     updateIpForHostnames(ipString, self.hostedZoneId, self.domains, self.route53, self.log);
   }).catch(function(error) {
      self.log.error("Error fetching IP from icanhazip ", error);
   });
}

RouteDynDns.prototype.listRecords = function() {
  this.log.info("Listing records for hosted Zone ID ", this.hostedZoneId);
  var self = this;
  this.route53.records(this.hostedZoneId).then(function(records) {
     _.each(records, function (rec, index) {
        self.log.info("Record name: " + rec.name + ", value: " + rec.values[0]);
     });
  }).catch(function(err) {
    self.log.info("Error getting records", err);
  });
}

module.exports = RouteDynDns;
