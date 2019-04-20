import { storiesOf } from '@storybook/vue'
import '../assets/main.scss'

import Select from '../components/atoms/Select.vue'

storiesOf('Select', module).add('list', () => ({
  components: {
    Select
  },
  template: `
    <div>
      <div>
        hoge1: {{ hoge1 }}
        <Select :options="options" v-model="hoge1" />
      </div>
      <div>
        hoge2: {{ hoge2 }}
        <Select :options="options" v-model="hoge2" :bg-color="backgroundColor" :color="textColor" />
      </div>
      <div>
        hoge3: {{ hoge3 }}
        <Select :options="options" :multiple="multiple" v-model="hoge3" />
      </div>
      <div>
        hoge4: {{ hoge4 }}
        <Select :options="options" :multiple="multiple" v-model="hoge4" :bg-color="backgroundColor" :color="textColor" />
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
      hoge1: 1,
      hoge2: 1,
      hoge3: [
        1
      ],
      hoge4: [
        1
      ],
      multiple: true,
      backgroundColor: '#42b883',
      textColor: '#fff'
    }
  }
}))
