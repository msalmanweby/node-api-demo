# Use Node.js Alpine image
FROM node:19.6-alpine

# Set working directory
WORKDIR /usr/src/app

# Set to the production
ENV NODE_ENV=production

# Copy package files first for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# # Set the root user to node
USER node

# Copy the rest of the application code
COPY --chown=node:node ./src .

# Expose Port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]