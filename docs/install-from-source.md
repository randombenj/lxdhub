# Installation

## Prerequisites

- [git >= 2.x.x](https://git-scm.com/)
- [docker >=18.02.0-ce](https://www.docker.com/)
- [docker-compose >=1.19.0](https://docs.docker.com/compose/install/#install-compose)

## Generate LXC Certificate

Before you can start the application, you need to add your LXC certificates.
More information on [generate-lxc-certificates.md](docs/generate-lxc-certificates.md)

## Install

Run the following commands in your terminal prompt.

```bash

# Clone the repository locally
git clone git@github.com:Roche/lxdhub.git lxdhub
cd lxdhub

mv lxdhub.yml.template lxdhub.yml
# Edit the configuration template
vi lxdhub.yml

# Build the containers
docker-compose build
# Run the containers (api, dbsync and db)
docker-compose up

# Open localhost:3000/api/v1/doc

```
