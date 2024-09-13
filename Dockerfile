FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
ARG service
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build-$service --env prod='true'

FROM node:20-slim AS runner
COPY --from=build /app/dist /dist
EXPOSE 8080
CMD ["node", "dist/bundle.js"]
