import { storiesOf } from '@storybook/vue'

import Button from '~/components/atoms/Button.vue'

storiesOf('Button', module).add('list', () => ({
  components: {
    'j-button': Button
  },
  template: `
    <div>
      <div class="flex-block">
        <div class="showcase">
          <div>
            <j-button text="追加する"/>
          </div>
        </div>
      </div>
    </div>
  `
}))
