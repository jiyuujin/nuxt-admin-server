import { storiesOf } from '@storybook/vue'
import '../assets/main.scss'

import Input from '../components/atoms/Input.vue'

storiesOf('Input', module).add('list', () => ({
  components: {
    Input
  },
  template: `
    <div>
      <div style="margin-bottom: 8px;">
        hoge1: {{ hoge1 }}
        <Input placeholder="姓" v-model="hoge1" />
      </div>
      <div style="margin-bottom: 8px;">
        hoge2: {{ hoge2 }}
        <Input placeholder="姓" v-model="hoge2" :bg-color="backgroundColor" :color="textColor" />
      </div>
    </div>
  `,
  data () {
    return {
      hoge1: '1234',
      hoge2: '1234',
      backgroundColor: '#42b883',
      textColor: '#fff'
    }
  },
}))
