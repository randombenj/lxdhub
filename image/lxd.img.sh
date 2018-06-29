#!/bin/sh
set -ex
PATH=$PATH:/snap/bin/
lxc delete -f lxdhub || true
lxc launch ubuntu:bionic lxdhub -c security.nesting=true
sleep 8
cat lxd.seed | lxc exec lxdhub -- lxd init --preseed
lxc exec lxdhub -- git clone https://github.com/Roche/lxdhub.git
lxc exec lxdhub -- sh -c 'curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -'
# parametrize NODE_REPO and DISTRIBUTION
# https://deb.nodesource.com/setup_9.x
lxc exec lxdhub -- sh -c 'echo "deb https://deb.nodesource.com/node_9.x bionic main" > /etc/apt/sources.list.d/nodesource.list'
# install yarn
lxc exec lxdhub -- sh -c 'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -'
lxc exec lxdhub -- sh -c 'echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list'
lxc exec lxdhub -- sh -c 'apt update && apt install nodejs yarn postgresql postgresql-contrib -y'
lxc exec lxdhub -- sh -c 'cd lxdhub && yarn --pure-lockfile && yarn bootstrap'
lxc exec lxdhub -- sh -c 'lxc remote add mylocal https://localhost:8443 --accept-certificate --password unsecret'
lxc exec lxdhub -- sh -c 'cd lxdhub && cp ~/.config/lxc/client.* certificates/'
# pw is lxdhub
lxc exec lxdhub -- sh -c "cat << EOF > /tmp/create-user.sql
SELECT pg_catalog.set_config('search_path', '', false);
CREATE ROLE lxdhub PASSWORD 'md573f61f97256447c5448623929121b2f5' SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;
CREATE DATABASE lxdhub;
EOF"
lxc exec lxdhub -- sudo -u postgres psql --file=/tmp/create-user.sql
# create lxdhub.yml
lxc exec lxdhub -- sh -c "cd lxdhub && cat << EOF > lxdhub.yml
---
remotes:
  # The name of the remote which gets displayed on lxdhub
  - name: images
    url: https://us.images.linuxcontainers.org:8443
    protocol: lxd
    public: true
    # If set to readonly = false, images can be cloned to
    # this remote
    readonly: true
  - name: local
    url: https://localhost:8443
    protocol: lxd
    public: false
    readonly: false
EOF"
# install services
lxc file push --uid 0 --gid 0 lxdhub-*.service lxdhub/lib/systemd/system/
lxc exec lxdhub -- systemctl daemon-reload
lxc exec lxdhub -- systemctl enable lxdhub-api.service lxdhub-dbsync.service
lxc exec lxdhub -- systemctl start lxdhub-api.service lxdhub-dbsync.service


lxc exec lxdhub -- git clone https://github.com/Roche/lxdhub-web.git
