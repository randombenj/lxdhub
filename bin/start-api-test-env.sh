#!/bin/bash


$PWD/bin/run-tests.sh
cp -rf ~/.config/lxc/client* certificates
NODE_ENV=test $PWD/packages/api/bin/start-api.js
