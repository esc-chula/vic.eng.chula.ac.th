FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

FROM node:14-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY public public
COPY src src
COPY .babelrc package.json static.config.js ./
RUN yarn build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html