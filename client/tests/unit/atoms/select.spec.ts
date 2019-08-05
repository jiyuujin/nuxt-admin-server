import Child from '@/components/atoms/Select.vue'

import { mount } from '@vue/test-utils'

// @testing-library/vue
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/vue'

afterEach(cleanup)

describe('shallow sample', () => {
    test('is a Vue instance', () => {
        const wrapper = mount(Child)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
