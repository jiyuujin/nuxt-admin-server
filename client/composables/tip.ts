import {
  computed,
  SetupContext,
  reactive,
  onMounted
} from '@vue/composition-api'

import { fetchTips, addTip } from '~/services/tipService'
import { fetchEvents } from '~/services/eventService'
import { ItemDataList } from '~/types/database'
import { CATEGORIES } from '~/utils/tip'
import { getTimeFormat } from '~/utils/date'

export default (props: {}, ctx: SetupContext) => {
  const state = reactive({
    activePage: 1 as number,
    perPage: 20 as number,
    tips: {} as ItemDataList,
    events: {} as ItemDataList,
    form: {
      title: '' as string,
      url: '' as string,
      description: '' as string,
      tags: [] as number[],
      event: 0 as number
    }
  })

  const eventOptions = computed(() => {
    let array: object[] = []
    if (state.events.item !== undefined) {
      state.events.item.forEach((item) => {
        array.push({
          value: item.data.id,
          text: item.data.name
        })
      })
    }
    return array
  })

  onMounted(async () => {
    Promise.all([
      (state.events = await fetchEvents()),
      (state.tips = await fetchTips())
    ])
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

  const timeFormat = (t) => {
    return getTimeFormat(t)
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
    eventOptions,
    titleText,
    tagText,
    applyPage,
    applyTitle,
    applyUrl,
    applyDescription,
    applyTags,
    applyEvent,
    timeFormat,
    reset,
    cancel,
    postTip
  }
}
