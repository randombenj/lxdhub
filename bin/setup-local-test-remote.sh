#!/bin/bash

lxc config set core.https_address "[::]:8443"
lxc config set core.trust_password unsecret
lxc remote add local-remote localhost:8443 --accept-certificate --password=unsecret
