FROM node:16-alpine3.14 as STAGE_BUILD

WORKDIR /code

ADD package*.json ./

RUN npm install

ADD . .

RUN npm run build

# CMD ["npm", "run", "start"]

FROM node:16-alpine3.14

WORKDIR /app

COPY --from=STAGE_BUILD /code/node_modules ./node_modules
COPY --from=STAGE_BUILD /code/dist ./dist
COPY package.json .
COPY env.yaml .

CMD ["npm", "run", "start"]