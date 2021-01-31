# docker-compose logs -f --tail 10 admin_front

# Nodeイメージを取得する
FROM node:14.14.0-alpine

# ワーキングディレクトリを指定する
WORKDIR /app

# パッケージをコピーする
COPY package*.json ./

# npm モジュールをインストールする
RUN yarn install --quiet

# その他のファイルをコピーする
COPY *.env ./
COPY babel*.config*.js ./
COPY nuxt*.config*.ts ./
COPY postcss*.config*.js ./
COPY tailwind*.config*.js ./
COPY tsconfig*.json ./
COPY ./client ./client

# なくても良いけど
ENV HOST 0.0.0.0

# なくても良いけど
EXPOSE 3000

# 起動する
CMD ["yarn", "run", "dev"]
