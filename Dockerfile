# Use the latest Alpine-based Node.js image
FROM node:alpine

# Install bash and OpenSSL (latest version available)
RUN apk update && apk add --no-cache bash openssl

# Set the working directory
WORKDIR /code

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install npm dependencies
RUN npm install

EXPOSE 8182

# Copy the rest of the application code
COPY . .
RUN npx prisma generate


# Run build and start commands (npm run build && npm start)
CMD ["sh", "-c", "npm run build && npm run dev"]
