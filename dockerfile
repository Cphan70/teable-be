# Step 1: Build dependencies
FROM node:23-slim AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN pnpm build

# Step 2: Production image
FROM node:23-slim

WORKDIR /app

# Copy only the necessary files
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Prisma client is already generated in node_modules
# Optional: re-generate if schema might change in prod
# RUN npx prisma generate

# Expose your NestJS port
EXPOSE 3000

CMD ["node", "dist/main"]
