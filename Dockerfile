ARG NODE_VERSION=18.12-slim

# Stage 1: Build the application
FROM node:${NODE_VERSION} AS builder

WORKDIR /build

# See .dockerignore
COPY . .

RUN npm cache clean --force && npm ci && npm run build

# Stage 2: Run the application
FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=builder /build/.output .

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["node", "./server/index.mjs"]
