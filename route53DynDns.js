var Route53 = require('nice-route53');

function Route53DynDns(awsAccessKey, awsSecret, domainsToChange) {

  this.route53 = new Route53({
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecret
  });

  this.domains = domainsToChange || [];
}

Route53DynDns.prototype.getPublicIp = function getPublicIp() {
  	// Use request Node library and promises (bluebird/Q?) to query the IP from icanhazip
    // Use route53 api to change the IP address for the requested domains
    // Use node-schedule package to schedule the execution every hour instead of
    // using crontab
    // Run with Forever and install as system service
}
