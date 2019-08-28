import Child from '@/components/atoms/Select.vue'

// @vue/test-utils
import { mount } from '@vue/test-utils'

// @testing-library/vue
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/vue'

afterEach(cleanup)

describe('shallow sample', () => {
    it('vue instance', () => {
        const wrapper = mount(Child)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('rendering', () => {
        render(Child, {
            propsData: {
                options: [
                    'abc',
                    'def',
                    'ghi'
                ],
                multiple: true,
                name: '選択してください'
            }
        })
    })
})
