import { SimpleList } from '~/types/database.types'

/**
 * お問い合わせカテゴリー
 * @type {*[]}
 */
export const CONTACT_CATEGORIES: SimpleList[] = [
    {
        value: 1,
        text: '仕事のご依頼'
    },
    {
        value: 2,
        text: '当ブログへのご提案'
    },
    {
        value: 10,
        text: 'ブログ記事全般'
    },
    {
        value: 99,
        text: 'その他'
    }
]
