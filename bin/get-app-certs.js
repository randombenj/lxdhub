const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const certPath = process.env.LXD_CERT || 'certificates/client.crt';
const keyPath = process.env.LXD_KEY || 'certificates/client.key';

const lxd = {
    cert: fs.readFileSync(path.join(ROOT, certPath)),
    key: fs.readFileSync(path.join(ROOT, keyPath))
};


module.exports = lxd;
