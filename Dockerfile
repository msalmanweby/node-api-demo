# Use Node.js Alpine image
FROM node:19.6-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

# Devlopment Stage
FROM base AS dev

# Install including dev dependencies
RUN npm install

# Copy the current directory
COPY . .

# Run the dev commmand
CMD ["npm", "run", "dev"]

# Production Stage
FROM base AS production

# Set the environment
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --only=production

# Set the user
USER node

# Copy only the src with the user
COPY --chown=node:node ./src .

# Expose the port of the app
EXPOSE 3000

# Run production command to start the app
CMD ["node", "index.js"]