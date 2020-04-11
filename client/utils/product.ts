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
    promotion: '絶賛「登壇駆動開発」中です！',
    rate: 3.7,
    description:
      '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。'
  },
  {
    id: 2,
    name: 'Web Developer - Yuma Kitamura',
    icons: ['Gatsby', 'React', 'AWS CDK', 'S3', 'Cloudfront'],
    price: '¥0',
    tooltip: 'ご気軽にチェックいただければ幸いです🙏',
    url: 'https://yuukit.me/',
    promotion: '絶賛「登壇駆動開発」中です！',
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
    promotion: '当サイトのことになります、まさに見ていただいてありがとうございます！',
    rate: 2.8,
    description:
      '2018年03月よりWeb猫ブログを始め、自身の経歴に深く寄与する管理画面を設計・開発しています。'
  },
  {
    id: 4,
    name: '(仮) 鋭意開発中',
    icons: ['Next', 'React', 'AppSync', 'Amplify'],
    price: '¥ 要相談',
    tooltip: '1顧客辺り料金がかかります',
    disabled: true,
    promotion: '個人としての活動が問われてくるので製作を始めました！',
    rate: 3.4,
    description:
      '2019年05月より求人に深く寄与する管理画面を設計・開発しています。'
  }
]
