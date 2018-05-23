#!/bin/bash


$PWD/bin/run-tests.sh
cp -rf ~/.config/lxc/client* certificates
NODE_ENV=test $PWD/bin/start-api.js
