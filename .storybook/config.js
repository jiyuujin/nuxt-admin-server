import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import Tailwindcss from 'tailwindcss'
import '../assets/main.scss'

Vue.use(ElementUI, {
  locale
})
Vue.use(Tailwindcss)

import { configure } from '@storybook/vue'

const req = require.context('../stories', true, /\.story\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
