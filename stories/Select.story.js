import { storiesOf } from '@storybook/vue'

import Select from '~/components/atoms/Select.vue'

storiesOf('Select', module)
.add('list', () => ({
  components: {
    'j-select': Select
  },
  template: `
    <div>
      <div>
        hoge: {{hoge}}
        <j-select :options="options" v-model="hoge" />
      </div>
    </div>
  `,
  data () {
    return {
      options: {
        1: 'Option1',
        2: 'Option2',
        3: 'Option3',
        4: 'Option4',
        5: 'Option5',
        6: 'Option6',
      },
      hoge: 1,
    }
  }
}))
