export const products: Array<{
  id: number
  name: string
  icons: string[]
  price: string
  tooltip: string
  url?: string
  disabled?: boolean
  promotion: string
  rate: number
  description: string
}> = [
  {
    id: 1,
    name: 'Web猫ブログ',
    icons: ['Nuxt', 'Vue', 'Contentful', 'Fargate'],
    price: '¥0',
    tooltip: 'ご気軽にチェックいただければ幸いです🙏',
    url: 'https://webneko.dev/',
    promotion: '「登壇駆動開発」を進めながら知見を発信していきます！',
    rate: 3.7,
    description:
      '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。'
  },
  {
    id: 2,
    name: 'Web Developer - Yuma Kitamura',
    icons: ['Gatsby', 'React', 'AWS CDK', 'S3', 'Cloudfront'],
    price: '¥0',
    tooltip: 'ご気軽にご連絡ください！ mm',
    url: 'https://yuukit.me/',
    promotion: '職務経歴書は今後不要、いつでもどこからでも確認できます！',
    rate: 4.4,
    description:
      '2020年01月よりVue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。'
  },
  {
    id: 3,
    name: 'Admin',
    icons: ['Nuxt', 'Vue', 'Firestore', 'Netlify', 'AWS lambda'],
    price: '¥ 要相談',
    tooltip: '1顧客辺り料金がかかります',
    url: 'https://nuxtadmin.netlify.com/',
    promotion:
      '当サイトのことになります、複数名によるログイン認証を実現した管理画面となります！',
    rate: 2.8,
    description:
      '2018年03月よりWeb猫ブログを始め、自身の経歴に深く寄与する管理画面を設計・開発しています。'
  },
  {
    id: 4,
    name: '(仮) 鋭意開発中',
    icons: [],
    price: '¥ 要相談',
    tooltip: '1顧客辺り料金がかかります',
    disabled: true,
    promotion: '常に個人としての活動が問われてきます。',
    rate: 3.4,
    description: '何らかの最新技術を追い求めていきます。'
  }
]
