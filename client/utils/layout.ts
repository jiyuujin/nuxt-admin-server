import { MenuList } from '~/types/database.types'

/**
 * メニュー
 * @type {*[]}
 */
export const MENU_LIST: MenuList[] = [
    {
        title: 'index',
        url: '/',
        src: 'setting.png',
        flex: 3
    },
    {
        title: 'tip',
        url: '/tip',
        src: 'nyanko.png',
        flex: 3
    },
    {
        title: 'flight',
        url: '/flight',
        src: 'takeoff.png',
        flex: 3
    },
]
