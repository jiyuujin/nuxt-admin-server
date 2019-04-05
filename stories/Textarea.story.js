import { storiesOf } from '@storybook/vue'

import Textarea from '~/components/atoms/Textarea.vue'

storiesOf('Textarea', module)
.add('list', () => ({
  components: {
    'j-textarea': Textarea
  },
  template: `
    <div>
      <div>
        hoge: {{hoge}}
        <j-textarea placeholder="姓" v-model="hoge" />
      </div>
    </div>
  `,
  data () {
    return {
      hoge: '1234'
    }
  }
}))
