FROM node:14.18-alpine

#RUN SOURCE CODE

WORKDIR /usr/app
COPY . .

RUN npm install --pure-lockfile

EXPOSE 3000

CMD ["npm", "start"]
