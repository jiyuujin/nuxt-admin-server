# docker-compose logs -f --tail 10 admin_api

# Nodeイメージを取得する
FROM node:12 AS builder

# ワーキングディレクトリを指定する
WORKDIR /app

# パッケージをコピーする
COPY package*.json ./

# npm モジュールをインストールする
RUN yarn install --quiet

# その他のファイルをコピーする
COPY . .

# なくても良いけど
ENV HOST 0.0.0.0

# なくても良いけど
EXPOSE 4000

# 起動する
CMD ["npm", "run", "start"]
