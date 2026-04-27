# Stage 1: Base/Builder
# Uses a lightweight Node.js image to prepare the application.
# [TEMPLATE NOTE] Change 'node:18-alpine' if your new project uses Python (e.g., python:3.9-slim), Java, etc.
FROM node:18-alpine AS base

# Sets the working directory inside the container.
WORKDIR /app

# Copies the source code into the container.
# [TEMPLATE NOTE] Change 'server.js' to your app's main file (e.g., 'app.py' or 'index.js'). If you have a package.json, copy it here and run 'npm install'.
COPY server.js .

# Stage 2: Production image
# Creates a fresh, empty image for production to keep the file size minimal.
FROM node:18-alpine
WORKDIR /app

# Copies only the necessary files from the 'base' stage.
# [TEMPLATE NOTE] Change 'server.js' if your entry file has a different name.
COPY --from=base /app/server.js .

# Creates a non-root user for security best practices.
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Switches to the non-root user.
USER appuser

# Documents the port the application listens on.
# [TEMPLATE NOTE] Change '8080' if your new app listens on a different port (e.g., 3000, 5000).
EXPOSE 8080

# The default command to start the application.
# [TEMPLATE NOTE] Change this to match how your app runs (e.g., ["npm", "start"] or ["python", "app.py"]).
CMD ["node", "server.js"]