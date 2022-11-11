ARG NODE_VERSION=18.12-slim

# Stage 1: Build the application
FROM node:${NODE_VERSION} AS builder

WORKDIR /build

COPY . .

RUN npm ci && npm run build && npm cache clean --force

# Stage 2: Run the application
FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=builder /build/src/.output .

ENV HOST=0.0.0.0
ENV PORT=3000

VOLUME /app
EXPOSE 3000

CMD ["node", "./server/index.mjs"]
