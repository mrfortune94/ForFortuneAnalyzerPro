#!/usr/bin/env node
const https = require('https');
const fs = require('fs');

const target = process.argv[2];
const paths = ['/admin', '/admin/login', '/cpanel', '/backend', '/manager', '/panel', '/dashboard'];
const log = fs.createWriteStream('logs/admin-finder-log.txt');

paths.forEach(path => {
  const req = https.get(target + path, res => {
    const msg = `[${res.statusCode}] ${target}${path}\n`;
    console.log(msg); log.write(msg);
  }).on('error', () => {
    const err = `[ERR] ${target}${path}\n`;
    console.log(err); log.write(err);
  });
});
