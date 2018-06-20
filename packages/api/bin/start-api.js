#!/usr/bin/env node
const { LXDHubAPI } = require('../lib');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../../..');

const certPath = process.env.LXD_CERT || 'certificates/client.crt';
const keyPath = process.env.LXD_KEY || 'certificates/client.key';

new LXDHubAPI({
    hostUrl: '0.0.0.0',
    port: 3000,
    logLevel: 'silly',
    lxd: {
        cert: fs.readFileSync(path.join(ROOT, certPath)),
        key: fs.readFileSync(path.join(ROOT, keyPath))
    },
    docUrl: '/api/v1/doc',
    database: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
        username: process.env.POSTGRES_USER || 'lxdhub',
        password: process.env.POSTGRES_PASSWORD || 'lxdhub',
        database: process.env.POSTGRES_DATABASE || 'lxdhub'
    }
}).run();
