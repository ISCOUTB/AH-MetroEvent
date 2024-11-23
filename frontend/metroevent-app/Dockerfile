FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /frontend/metroevent-app/app

# Install dependencies securely, ignoring third-party scripts unless needed
COPY package.json .
COPY package-lock.json .
RUN npm ci --ignore-scripts

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /frontend/metroevent-app/app
COPY --from=deps /frontend/metroevent-app/app/node_modules ./node_modules
COPY package.json .
COPY package-lock.json .
COPY next.config.js .
COPY tsconfig.json .
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /frontend/metroevent-app/app

ENV NODE_ENV=production

# Create and use a non-root user for running the application
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir .next \
  && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=root:root --chmod=755 /frontend/metroevent-app/app/.next/standalone ./
COPY --from=builder --chown=root:root --chmod=755 /frontend/metroevent-app/app/.next/static ./.next/static

USER nextjs

EXPOSE 9020

ENV PORT=9020
ENV HOSTNAME="0.0.0.0"

# Use the standalone server created by next build
CMD ["node", "server.js"]
