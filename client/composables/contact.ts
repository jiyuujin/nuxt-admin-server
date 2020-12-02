import { SetupContext, reactive } from '@vue/composition-api'

export default (props, ctx: SetupContext) => {
  const state = reactive({
    activePage: 1,
    perPage: 20
  })

  const titleText = (item: any) => {
    return `${item.data.category.text} / ${item.data.title}`
  }

  const applyPage = (value: number) => {
    state.activePage = value
  }

  return {
    state,
    titleText,
    applyPage
  }
}
