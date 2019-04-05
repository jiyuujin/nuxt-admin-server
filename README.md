# nuxt-admin-server

```bash
# Local Dev Server
$ npm run dev
```

## 設計原則

### 最小単位コンポーネントをatomsに設定
Storybookで運用する

```bash
yarn add @storybook/vue @storybook/addon-actions @storybook/addon-links -D
```

```bash
yarn add node-sass sass-loader pug pug-loader -D
```

### 各エンティティを設定、小〜中規模程度のコンポーネントを準備
1. tip
2. video
3. qiita
4. flight
5. contact
6. event
7. layout

### テンプレートコンポーネントをtemplatesに設定
1. main-template
2. form-template

### Vuexストア
ページコンポーネントで使用を基本とする
