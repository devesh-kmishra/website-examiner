FROM mcr.microsoft.com/playwright:v1.57.0-noble
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy from host curr_workdir to container curr_workdir
COPY . .

RUN npm run build

# Default command (overridden in docker-compose)
CMD ["node", "dist/index.js"]