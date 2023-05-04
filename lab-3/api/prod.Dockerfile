# Stage 1: Build
FROM node:16-alpine as build

WORKDIR /app

# Copy package.json, yarn.lock
COPY package.json yarn.lock ./

# Install production dependencies
RUN yarn install --production --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN yarn build

# Remove development dependencies and source files
RUN yarn install --production --ignore-scripts --frozen-lockfile && \
    rm -rf src

# Stage 2: Create the production image
FROM node:16-alpine

WORKDIR /app

# Copy production dependencies from the build stage
COPY --from=build /app/node_modules /app/node_modules

# Copy the compiled JavaScript files from the build stage
COPY --from=build /app/dist /app/dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "/app/dist/index.js"]
