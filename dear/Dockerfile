 # Node.jsベースの軽量イメージ
FROM node:18-alpine

# 作業ディレクトリを /app に設定
WORKDIR /app

# package.json だけ先にコピー（キャッシュ効かせる）
COPY package*.json ./

# 依存インストール
RUN npm install

# ソースコードを全コピー
COPY . .

# Next.jsのビルド
RUN npm run build

# 3000番ポートを開ける
EXPOSE 3000

# アプリ起動（本番用）
CMD ["npm", "start"]
