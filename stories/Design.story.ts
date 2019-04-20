import { storiesOf } from '@storybook/vue'
import '../assets/main.scss'

import TailwindConfig from '../tailwind'

storiesOf('Design', module).add('list', () => ({
  data() {
    return {
      colors: TailwindConfig.colors
    };
  },
  template: `
    <div class="flex flex-wrap m-8">
      <div v-for="(value, key) in colors" class="w-32 mb-2 hover-woof">
        <div :class="'rounded shadow h-6 w-16 bg-' + key">
        </div>
        <p class="text-xs text-grey mt-2 uppercase">{{ key }}</p>
      </div>
    </div>
    `
  }))
