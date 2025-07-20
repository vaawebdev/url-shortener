FROM node:24.4.1-alpine3.20 AS base

FROM base AS dependencies

RUN apk update && apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package*.json ./
RUN npm i

FROM base AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["server.js"]
