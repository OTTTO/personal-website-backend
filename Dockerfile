FROM node:16.15.1-slim as BASE
# Load the application code
RUN mkdir -p /app
WORKDIR /app
ADD . /app

ENV DB_HOST db

# Install dependencies
RUN apt-get update && apt-get install -y openssl libssl-dev
RUN npm install
RUN npm run build

# Start 'er up
CMD ["npm", "run", "start"]
