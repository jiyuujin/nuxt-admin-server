import { ref, provide, inject, SetupContext } from '@vue/composition-api'

import { MENU_LIST } from '~/utils/layout'

export const key = Symbol()

const keyLocalStorage = 'admin-theme-mode'

let nowRotate = 0

const rotate = () => {
  nowRotate += 180
  const icon = <HTMLInputElement>document.querySelector('#icon-rotate')
  icon.style.transform = 'rotate(' + nowRotate + 'deg)'
}

export const createLayout = () => {
  const mode = ref('light')
  const change = () => {
    rotate()
    const btn = <HTMLInputElement>document.querySelector('#btn-mode')
    if (btn.checked === true) {
      mode.value = 'dark'
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
      localStorage.setItem(keyLocalStorage, 'dark')
    } else {
      mode.value = 'light'
      document.body.classList.remove('dark-theme')
      document.body.classList.add('light-theme')
      localStorage.setItem(keyLocalStorage, 'light')
    }
  }
  return { mode, change }
}

export const provideLayout = () => {
  provide(key, createLayout())
}

export const useLayout = (): any => {
  return inject(key)
}

export default (props: {}, ctx: SetupContext) => {
  const menu = ref(0)
  const selectMenu = (m: number) => {
    menu.value = m
    const name = MENU_LIST.find((ml: any) => ml.value === m)
    ctx.root.$router.push(`/${name?.text}`)
  }
  return { menu, selectMenu }
}
