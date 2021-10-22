FROM node:14-buster as builder

RUN addgroup --system tecogroup && adduser -S -s /bin/false -G tecogroup teco

# Build API Doc
RUN mkdir apidoc backend frontend
WORKDIR apidoc
COPY apidoc/* .
RUN yarn install
RUN yarn build

# Build the backend
WORKDIR backend
COPY app codegen.yml package.json tsconfig.json yarn.lock ./
RUN yarn install
RUN yarn generate:types && yarn tsc

# Build the frontend
WORKDIR frontend
RUN yarn install
ENV NODE_ENV=production
COPY frontend/. ./
RUN cp .env.frontend .env.production.local && yarn build


# Build the application
FROM node:current-alpine AS prolang
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /backend/package.json yarn.lock build ./
RUN mkdir public && cp .env.backtend .env
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public

