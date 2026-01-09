FROM node:20-bookworm-slim
WORKDIR /app
# Добавляем эти две строки перед npm run build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "8080"]