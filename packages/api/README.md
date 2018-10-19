<h2 align="center">
  <img src="https://i.imgur.com/RGCZZjl.png" alt="LXD Hub Logo" width="500" />
</h2>
  
 <p align="center">Display, search and copy <a href="https://linuxcontainers.org/lxd/" target="blank">LXD</a> images using a web interface. </p>


# Prerequisites

- [node >= 9.6.1](https://nodejs.org/en/)
- [yarn >= 1.7.0](https://yarnpkg.com/en/)
- [docker >=18.02.0-ce](https://www.docker.com/)

# Installation

## Database

LXDHub API uses a PostgreSQL database to store its data.
You must set up a PostgreSQL on your local machine or inside a docker container

### Using Docker

```bash
docker pull postgres:10.3
docker run -p 5432:5432 \
           -e POSTGRES_USER=lxdhub \
           -e POSTGRES_DB=lxdhub \
           -e POSTGRES_PASSWORD=lxdhub \
           -v db:/var/lib/postgresql/data \
           -d --name db postgres:10.3
```

## NodeJS

### CLI

```bash
npm install -g @lxdhub/api

# Run locally
lxdhub-api start --cert certificates/client.crt --key certificates/client.key
```

### Programmatically

```bash
npm install -s @lxdhub/api
```

Example usage in NodeJS

```javascript
const { LXDHubAPI } = require('@lxdhub/api');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const certPath = path.join(ROOT, 'certificates/client.crt');
const keyPath = path.join(ROOT, 'certificates/client.key');

LXDHubAPI.run({
    hostUrl: '0.0.0.0',
    port: 3000,
    lxd: {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath)
    },
    database: {
        host: 'localhost',
        port: 5432,
        username: 'lxdhub',
        password: 'lxdhub',
        database: 'lxdhub'
    }
});

```

## Docker

LXDHub supports Docker. You can pull the latest version using the `brunnel6/lxdhub-api:latest` tag
or a specific version e.g. `brunnel6/lxdhub-api:1.0.0`

```bash
docker pull brunnel6/lxdhub-api:latest
docker run -v "$(pwd)/certificates:/var/lib/lxdhub/certificates" \
           -p 3000:3000 \
           -e POSTGRES_HOST=postgres \
           --link db:postgres \
           brunnel6/lxdhub-api:latest
```
