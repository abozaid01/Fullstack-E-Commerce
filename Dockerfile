#Stage 1: Base Image Stage
FROM node:lts-alpine AS base

# Stage 2 : Development Stage
FROM base as builder
WORKDIR /app
COPY package* ./
RUN npm i
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]

# Stage 3: Testing Stage
FROM base as testing
WORKDIR /app
COPY package* ./
RUN npm i
COPY . .
CMD ["npm", "test"]

# Stage 4 Production Stage
FROM base as production
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/dist ./dist
CMD [ "npm", "start" ]