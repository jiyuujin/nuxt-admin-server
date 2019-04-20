import { storiesOf } from '@storybook/vue'
import '../assets/main.scss'

import Button from '../components/atoms/Button.vue'

storiesOf('Button', module).add('list', () => ({
  components: {
    Button
  },
  template: `
    <div class="m-8">
      <Button text="追加する" />
    </div>
  `
}))
