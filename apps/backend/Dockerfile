FROM node:20-alpine

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy source code
COPY src ./src

# Copy migrations and Drizzle config
COPY migrations ./migrations
COPY drizzle.config.ts ./

# Copy tsconfig.json for TypeScript build
COPY tsconfig.json ./

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE 3002

# Optionally run Drizzle migrations automatically
# CMD ["sh", "-c", "yarn drizzle-kit push && yarn start"]

# Start backend
CMD ["yarn", "start"]
