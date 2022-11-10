ARG NODE_VERSION=18.12-slim

# Stage 1: Build the application
FROM node:${NODE_VERSION} AS builder

WORKDIR /build

# See .dockerignore
COPY . .

RUN npm ci && npm cache clean --force && ls -a

# Stage 2: Run the application
FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=builder /build/src/.output .

VOLUME /app
EXPOSE 3000

CMD ["node", "./server/index.mjs"]
