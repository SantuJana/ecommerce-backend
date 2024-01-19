const { log, info } = require('console');
const crypto = require('crypto');

info(crypto.randomBytes(64).toString('hex'));