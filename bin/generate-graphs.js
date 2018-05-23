#!/usr/bin/env node
const madge = require('madge');
const path = require('path');

// The absolute path of the root directory of this project
const ROOT = path.join(__dirname, '../');

const MADGE_CONF = {
    "backgroundColor": "#ffffff",
    "nodeColor": "#000000",
    "noDependencyColor": "#000000",
    "cyclicNodeColor": "#000000",
    "edgeColor": "#000000"
};

const graphs = [];

const DBSYNC = {
    path: 'lib/dbsync/index.js',
    file: 'dbsync-dependency.png'
};

const DB = {
    path: 'lib/db/index.js',
    file: 'db-dependency.png'
};

const API = {
    path: 'lib/api/index.js',
    file: 'api-dependency.png'
};

graphs.push(DBSYNC);
graphs.push(DB);
graphs.push(API);

graphs.forEach(graph =>
    madge(path.join(ROOT, graph.path), MADGE_CONF)
        .then(res => res.image(path.join(ROOT, 'docs/assets/graphs', graph.file)))
        .then(path => console.log(`Graph written to ${path}`))
);
