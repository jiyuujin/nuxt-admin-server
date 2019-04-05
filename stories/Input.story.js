import { storiesOf } from '@storybook/vue'

import Input from '~/components/atoms/Input.vue'

storiesOf('Input', module)
.add('list', () => ({
  components: {
    'j-input': Input
  },
  template: `
    <div>
      <div>
        hoge: {{hoge}}
        <j-input placeholder="姓" v-model="hoge" />
      </div>
    </div>
  `,
  data () {
    return {
      hoge: '1234'
    }
  }
}))
