FROM node:18.12 AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:18.12 AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=web...

FROM node:18.12 AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 ui
USER ui

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=ui:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=ui:nodejs /app/apps/web/.next/static ./apps/web/.next/static

CMD node apps/web/server.js
