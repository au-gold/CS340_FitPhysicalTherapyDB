# Step 1: Build Stage
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY ./package.json ./package-lock.json ./

RUN CI=true
RUN npm install

# Copy source files
COPY . ./

# Build the application
RUN npm run build

RUN alias forever='./node_modules/forever/bin/forever'

# Expose port 58887 for the web server
EXPOSE 58887

# Start
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]