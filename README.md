# admin

```bash
# Local Dev Server
yarn dev
```

## Nuxt

テンプレートコンポーネントとその他各エンティティに、小〜中規模程度のコンポーネントを準備します。AtomsコンポーネントはStorybookで運用します。

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
./node_modules/.bin/tailwind init tailwind.config.js
```

### Admin 本番環境

https://admin.nekodev.app/

~~https://nuxtadmin.netlify.com/~~

### Storybook 開発環境

https://j-stylebook.netlify.com/

## Function

```bash
npm i -g firebase-tools

# Runtime for Node v8
yarn install --ignore-engines

# Local Dev Server
cd functions && yarn deploy
```

プロジェクトを選択します。

```bash
firebase use --add
```

関数を削除する場合 `onTipCreated` に適当な関数名を入力、Slack Webhookを使う場合は下記の通り入力します。

```bash
firebase functions:delete onTipCreated

# Slack Webhook
firebase functions:config:set slack.webhook_url="https://hooks.slack.com/services/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"
firebase functions:config:get
```
