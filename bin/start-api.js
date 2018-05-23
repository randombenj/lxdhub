#!/usr/bin/env node
const { LXDHubAPI } = require('@lxdhub/api');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const certPath = process.env.LXD_CERT || path.join(ROOT, 'certificates/client.crt');
const keyPath = process.env.LXD_KEY || path.join(ROOT, 'certificates/client.key');

new LXDHubAPI({
    hostUrl: '0.0.0.0',
    port: 3000,
    logLevel: 'silly',
    lxd: {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath)
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
