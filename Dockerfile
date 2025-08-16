FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
 
FROM base AS build
WORKDIR /app
COPY . .
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV NODE_ENV=production
ENV DISABLE_ESLINT_PLUGIN=true
RUN pnpm run build
 
FROM base AS dokploy
WORKDIR /app
ENV NODE_ENV=production
 
# Copy only the necessary filesdoc
COPY --from=build /app/build ./build
