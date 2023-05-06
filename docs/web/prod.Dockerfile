# Stage 1: Build
FROM node:16-alpine as build

WORKDIR /app

# Copy package.json, yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN yarn build

# Stage 2: Serve with Nginx
FROM registry.access.redhat.com/ubi8/nginx-120

# Copy the built assets from the build stage
COPY --from=build /app/build /opt/app-root/src

# Expose the Nginx server port
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
