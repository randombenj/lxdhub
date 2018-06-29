#!/bin/sh
# install certbot for requesting a certifiate on let's encrypt
sudo sh -c 'apt update && apt-get install software-properties-common'
sudo add-apt-repository ppa:certbot/certbot -y
sudo apt-get update
sudo apt-get install python-certbot-nginx

sudo certbot --nginx -m eric.keller.ek1@roche.com -n -d lxdhub.efiks.ovh
sudo certbot renew --dry-run
