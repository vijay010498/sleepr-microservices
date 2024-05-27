FROM node:alpine As development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json

RUN npm install -g pnpm
RUN pnpm install

COPY apps/auth apps/auth
COPY libs libs


RUN pnpm run build

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

CMD [ "node", "dist/apps/auth/main" ]
