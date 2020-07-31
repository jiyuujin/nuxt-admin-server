import { SetupContext, reactive, onMounted } from '@vue/composition-api'

import { fetchContacts } from '~/services/contactService'
import { getTimeFormat } from '~/utils/date'

export default (props, ctx: SetupContext) => {
  const state = reactive({
    activePage: 1,
    contacts: {}
  })

  onMounted(async () => {
    state.contacts = await fetchContacts()
  })

  const titleText = (item: any) => {
    return `${item.data.category.text} / ${item.data.title}`
  }

  const applyPage = (value: number) => {
    state.activePage = value
  }

  const timeFormat = (t) => {
    return getTimeFormat(t)
  }

  return {
    state,
    titleText,
    applyPage,
    timeFormat
  }
}
