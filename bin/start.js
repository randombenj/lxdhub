#!/usr/bin/env node
const startApiUi = require('./start-api-ui');
const { LXDHubDbSync } = require('@lxdhub/dbsync');
const fs = require('fs-extra');
const path = require('path');
const YAML = require('js-yaml');
const lxd = require('./get-app-certs');
const argv = require('minimist')(process.argv.slice(2));

const servicesToStart = argv._.length ? argv._ : ['api', 'dbsync', 'ui'];

// Default time (in minutes) when the interval task should be executed
const DEFAULT_SYNC_INTERVAL = 3;

const DEFAULT_LXD_CONFIG_PATH = './lxdhub.yml';

const ROOT = path.join(__dirname, '..');

const database = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'lxdhub',
    password: process.env.POSTGRES_PASSWORD || 'lxdhub',
    database: process.env.POSTGRES_DATABASE || 'lxdhub',
};

const lxdConfigPath = process.env.LXDHUB_CONFIG || DEFAULT_LXD_CONFIG_PATH;
const lxdConifgAbsolutePath =
    path.isAbsolute(lxdConfigPath) ?
        lxdConfigPath :
        path.join(ROOT, lxdConfigPath);


// Sync Interval in minutes
const syncInterval = parseInt((process.env.SYNC_INTERVAL || DEFAULT_SYNC_INTERVAL)) * 1000 * 60;

const logLevel = process.env.LOG_LEVEL;

const startDbsync = async () => {
    // Function, which will be run as interval
    const intervalTask = () =>
        // Read the config file
        fs.readFile(lxdConifgAbsolutePath, 'utf8')
            // Convert from YAML to JSON
            .then(content => YAML.safeLoad(content))
            // Create the database sync instance
            .then(lxdhubConfig => new LXDHubDbSync({ lxd, database, logLevel, lxdhubConfig }))
            // Run the database sync script
            .then(dbSync => dbSync.run())
            .catch(err => console.error(err));

    // Run task when starting
    intervalTask();

    // Register interval
    setInterval(() => intervalTask(), syncInterval);
}


if (servicesToStart.indexOf('dbsync') !== -1) {
    startDbsync();
}
if (servicesToStart.indexOf('api') !== -1 && servicesToStart.indexOf('ui') !== -1) {
    startApiUi();
}
