FROM node:21-bookworm AS builder

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:21-bookworm AS runner

WORKDIR /
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# RUN mkdir -p /root/.ssh && \
#     echo "Host c3sfr1.di.unito.it \n\
# 		StrictHostKeyChecking no \n" >> /root/.ssh/config

EXPOSE 3000

CMD ["npm", "start"]