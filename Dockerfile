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
 
FROM node:18-alpine AS dokploy
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
