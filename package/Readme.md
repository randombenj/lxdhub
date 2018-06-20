# Packaging LXDHub

## LXD image

```
lxc launch ubuntu:bionic lxdhub -c security.nesting=true
cat lxd.seed | lxc exec lxdhub -- lxd init --preseed
lxc exec lxdhub -- git clone https://github.com/Roche/lxdhub.git
lxc exec lxdhub -- sh -c 'curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -'
# parametrize NODE_REPO and DISTRIBUTION
# https://deb.nodesource.com/setup_10.x
lxc exec lxdhub -- sh -c 'echo "deb https://deb.nodesource.com/node_10.x bionic main" > /etc/apt/sources.list.d/nodesource.list'
# install yarn
lxc exec lxdhub -- sh -c 'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -'
lxc exec lxdhub -- sh -c 'echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list'
lxc exec lxdhub -- sh -c 'apt update && apt install nodejs yarn -y'
```
