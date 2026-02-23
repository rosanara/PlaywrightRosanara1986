 
# copy the test results to a mounted volume for access outside the container
 



FROM mcr.microsoft.com/playwright::v1.58.2-jammy

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Playwright MCP
RUN npm install @playwright/mcp

# Copy your project files
COPY . .

# Expose MCP server port
EXPOSE 3000

# Run MCP server
CMD ["npx", "@playwright/mcp@latest", "--port", "3000"]