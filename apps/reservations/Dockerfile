FROM node:alpine As development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/reservations apps/reservations
COPY libs libs
COPY proto proto

# Install microservice specific dependicies
RUN pnpm install -r --force

RUN pnpm run build reservations

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

RUN npm install -g pnpm

RUN pnpm install  --production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/reservations/main" ]
