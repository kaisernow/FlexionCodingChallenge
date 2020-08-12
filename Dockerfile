FROM node:12

WORKDIR /conversion-app/app/frontend

COPY /client/conversion-app/package.json ./

RUN npm install

COPY /client/conversion-app/. .

RUN npm i @angular/cli -g

RUN npm run build:prod

WORKDIR /conversion-app/app/api

COPY /server/conversion-app/package.json ./

RUN npm install

COPY /server/conversion-app/. .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]