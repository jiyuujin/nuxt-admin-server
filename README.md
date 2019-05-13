# nuxt-admin-server

```bash
# Local Dev Server
yarn dev
```

```bash
now -e API_KEY="AIzaSyAV7kCXzIPqtKeFnaNz-ywA3NEBUBw7S24" -e AUTH_DOMAIN="nuxtadmin-4a9e0.firebaseapp.com" -e PROJECT_ID="nuxt-admin-tokyo" -e GRAPH_API="https://api.graph.cool/simple/v1/cjr94yoay4hds0196reyj9lke" -e APOLLO_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDgyNDQ3NzQsImNsaWVudElkIjoiY2pyOTR5b2F5NGhkdDAxOTYwajIwdDE1aiJ9.WulBc4uocM_ytX6b6-U9Et_ieGGERE2BpYZVkpaBUlo"
```

## Admin 本番環境

https://nuxt-admin-web.appspot.com/

https://nuxtadmin.netlify.com/

### トップページ
![](./docs/index.png)

## Storybook 開発環境

https://j-stylebook.netlify.com/

## 設計原則

テンプレートコンポーネントとその他各エンティティに、小〜中規模程度のコンポーネントを準備します。

AtomsコンポーネントはStorybookで運用します。

```bash
yarn add @storybook/vue @storybook/addon-actions @storybook/addon-links @storybook/addon -D
yarn add @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-service -D
yarn add node-sass sass-loader typescript -D
```

tailwindcssをインストールします。

```bash
yarn add tailwindcss
```

インストール後 tailwindcss.jsを準備します。

```bash
./node_modules/.bin/tailwind init tailwind.js
```
