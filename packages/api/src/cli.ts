#!/usr/bin/env node
import './cli/commands/start/default';

import { CLI, Shim } from 'clime';
import * as Path from 'path';

const cli = new CLI('lxdhub-api', Path.join(__dirname, 'cli/commands'));

const shim = new Shim(cli);
shim.execute(process.argv);
