#!/usr/bin/env node

import * as Path from 'path';
import { CLI, Shim } from 'clime';
import './cli/commands/start/default';

const cli = new CLI('lxdhub-dbsync', Path.join(__dirname, 'cli/commands'));

const shim = new Shim(cli);
shim.execute(process.argv);
