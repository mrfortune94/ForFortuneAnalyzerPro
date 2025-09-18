#!/usr/bin/env node
const fs = require('fs');
const crypto = require('crypto');

const hashFile = process.argv[2];
const wordlist = process.argv[3];
const log = fs.createWriteStream('logs/brute-results.txt');

const hashes = fs.readFileSync(hashFile, 'utf-8').trim().split('\n');
const words = fs.readFileSync(wordlist, 'utf-8').trim().split('\n');

hashes.forEach(hash => {
  for (const word of words) {
    const test = crypto.createHash('md5').update(word).digest('hex');
    if (test === hash) {
      const match = `MATCH: ${hash} = ${word}\n`;
      log.write(match); console.log(match);
      break;
    }
  }
});
