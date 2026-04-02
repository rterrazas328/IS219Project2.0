FROM node:24 as build

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 51751

ENTRYPOINT [ "entrypoint.sh" ]

CMD ["npm", "start"]