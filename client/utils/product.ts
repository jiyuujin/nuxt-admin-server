export const products: Array<{
  id: number
  title: string
  icon: string | any
  tags: string[]
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
    title: 'Web猫ブログ',
    icon: require('../static/icon/webneko-blog-white.png'),
    tags: ['Nuxt', 'Vue', 'Contentful', 'Fargate'],
    price: '¥0',
    tooltip: 'ご気軽にチェックいただければ幸いです🙏',
    url: 'https://webneko.dev/',
    promotion: '「登壇駆動開発」を進めながら知見を発信していきます！',
    rate: 3.7,
    description:
      '2018年10月より、Vue.jsやNuxtを使ったウェブログとして設計・開発・運用しています。'
  },
  {
    id: 2,
    title: 'Web Developer - Yuma Kitamura',
    icon: require('../static/icon/bakeneko2.png'),
    tags: ['Gatsby', 'React', 'AWS CDK', 'S3', 'Cloudfront'],
    price: '¥0',
    tooltip: 'ご気軽にご連絡ください！ mm',
    url: 'https://yuukit.me/',
    promotion: '職務経歴書は今後不要、いつでもどこからでも確認できます！',
    rate: 4.4,
    description:
      '2020年01月より、Gatsby.jsを使ったプロフィールサイトとして設計・開発・運用しています。'
  }
]
