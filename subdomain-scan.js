#!/usr/bin/env node
const dns = require('dns');

const domain = process.argv[2];
const commonSubs = ['www', 'admin', 'mail', 'dev', 'test', 'cpanel'];
const log = require('fs').createWriteStream('logs/subdomain-scan-log.txt');

commonSubs.forEach(sub => {
  const full = `${sub}.${domain}`;
  dns.resolve(full, err => {
    if (!err) {
      log.write(`FOUND: ${full}\n`);
      console.log(`FOUND: ${full}`);
    }
  });
});
