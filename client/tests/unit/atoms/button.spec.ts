import Child from '@/components/atoms/Button.vue'

// @vue/test-utils
import { mount } from '@vue/test-utils'

// @testing-library/vue
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/vue'

afterEach(cleanup)

describe('Button', () => {
  it('vue instance', () => {
    const wrapper = mount(Child)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('rendering', () => {
    render(Child, {
      propsData: {
        text: '追加する'
      }
    })
  })
})
