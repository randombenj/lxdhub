#!/bin/sh
set -e
# install certbot for requesting a certifiate on let's encrypt
sudo sh -c 'apt update && apt-get install software-properties-common'
sudo add-apt-repository ppa:certbot/certbot -y
sudo apt-get update
sudo apt-get install python-certbot-nginx

sudo certbot --nginx -m eric.keller.ek1@roche.com -n -d lxdhub.xyz
sudo certbot renew --dry-run

sudo ln -sf /etc/letsencrypt/live/lxdhub.xyz/fullchain.pem /var/lib/lxd/server.crt
sudo ln -sf /etc/letsencrypt/live/lxdhub.xyz/privkey.pem /var/lib/lxd/server.key
sudo systemctl restart lxd
