import { storiesOf } from '@storybook/vue'
import '../client/assets/main.scss'

import Button from '../client/components/atoms/Button.vue'

storiesOf('Button', module).add('list', () => ({
    components: {
        Button
    },
    template: `
    <div class="m-8">
      <div style="margin-bottom: 8px;">
        <Button text="追加する" />
      </div>
      <div style="margin-bottom: 8px;">
        <Button text="追加する" :bg-color="backgroundColor" :color="textColor" />
      </div>
    </div>
  `,
    data() {
        return {
            backgroundColor: '#42b883',
            textColor: '#fff'
        }
    },
}))
