FROM node:20-alpine AS base

FROM base AS deps
RUN apk upgrade && apk update
RUN corepack enable

FROM deps AS builder
WORKDIR /app

COPY . .

RUN corepack install

RUN if [ -f pnpm-lock.yaml ]; then \
    pnpm i --frozen-lockfile --force && \
    pnpm prebuild && pnpm build && pnpm postbuild; \
    # yarn
    elif [ -f yarn.lock ]; then \
    yarn install --frozen-lockfile && \
    yarn prebuild && yarn build && yarn postbuild; \ 
    # npm
    elif [ -f package-lock.json ]; then \
    npm ci && \
    npm run build; \
    fi

FROM deps AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 developer

COPY --from=builder --chown=developer:nodejs /app/dist .
COPY --from=builder --chown=developer:nodejs /app/yarn.lock* /app/pnpm-lock.yaml* /app/package-lock.json* ./
COPY --from=builder --chown=developer:nodejs /app/.yarn* ./.yarn

RUN corepack install

RUN if [ -f pnpm-lock.yaml ]; then \
    pnpm i --prod; \
    elif [ -f yarn.lock ]; then \
    yarn workspaces focus --production; \
    else npm ci --production; \
    fi

USER developer