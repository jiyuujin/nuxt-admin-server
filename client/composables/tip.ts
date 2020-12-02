import { SetupContext, reactive } from '@vue/composition-api'

import { addTip } from '~/services/tipService'

import { CATEGORIES } from '~/utils/tip'

export default (props: {}, ctx: SetupContext) => {
  const state = reactive({
    activePage: 1 as number,
    perPage: 20 as number,
    form: {
      title: '' as string,
      url: '' as string,
      description: '' as string,
      tags: [] as number[],
      event: 0 as number
    }
  })

  const titleText = (item: any) => {
    return item.data.title
  }

  const tagText = (tagId: number) => {
    let result: string = ''
    CATEGORIES.map((category) => {
      if (category.value === tagId) {
        result = category.text
      }
    })
    return result
  }

  const applyPage = (value: number) => {
    state.activePage = value
  }

  const applyTitle = (value: string) => {
    state.form.title = value
  }

  const applyUrl = (value: string) => {
    state.form.url = value
  }

  const applyDescription = (value: string) => {
    state.form.description = value
  }

  const applyTags = (values: number[]) => {
    state.form.tags = [...values]
  }

  const applyEvent = (value: number) => {
    state.form.event = value
  }

  const reset = () => {
    state.form.title = ''
    state.form.url = ''
    state.form.description = ''
    state.form.tags = [0]
    state.form.event = 0
  }

  const cancel = () => {
    reset()
  }

  const postTip = async () => {
    await addTip(state.form)
    reset()
  }

  return {
    state,
    titleText,
    tagText,
    applyPage,
    applyTitle,
    applyUrl,
    applyDescription,
    applyTags,
    applyEvent,
    reset,
    cancel,
    postTip
  }
}
