import { Menu } from '~/types/utils'

/**
 * メニュー
 * @type {*[]}
 */
export const MENU_LIST: Menu[] = [
  {
    value: 0,
    text: 'top',
    url: '/',
    src: '',
    flex: 3
  },
  {
    value: 1,
    text: 'tip',
    url: '/tip',
    src: 'nyanko.png',
    flex: 3
  },
  {
    value: 2,
    text: 'flight',
    url: '/flight',
    src: 'takeoff.png',
    flex: 3
  }
]
