FROM node:9.6.1

WORKDIR /var/lib/lxdhub

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
