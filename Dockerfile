# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy remaining project files
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]
