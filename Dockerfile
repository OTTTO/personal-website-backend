FROM node:16.15.1-alpine as BASE
# Load the application code
RUN mkdir -p /app
WORKDIR /app
ADD . /app

ENV DB_HOST db

# Install dependencies
RUN npm install
RUN npm run build

# Start 'er up
CMD ["npm", "run", "start"]
