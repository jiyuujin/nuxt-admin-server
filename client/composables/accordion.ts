import { computed, SetupContext } from '@vue/composition-api'

type AccordionProps = {
  labelText: string
  title: string
  items: object[]
  selectedIds: string[]
}

export default (props: AccordionProps, ctx: SetupContext) => {
  const updatedIds = computed(() => {
    return [...props.selectedIds]
  })

  const filteredDetail = computed(() => {
    if (props.items === null) {
      return []
    }
    return props.items
  })

  const isSelectedAll = computed(() => {
    const allItemIds = props.items.map((item: any) => item.itemId)
    for (let i = 0; i < allItemIds.length; i++) {
      if (!updatedIds.value.includes(allItemIds[i])) {
        return false
      }
    }
    return true
  })

  const getIconsColorClass = computed(() => {
    if (isSelectedAll.value) {
      return 'exists'
    }
    return ''
  })

  const getIconsStyle = computed(() => {
    if (isSelectedAll.value) {
      return 'folder-minus'
    }
    return 'folder-plus'
  })

  const getItemName = (id: string) => {
    let name = ''
    props.items.map((item: any) => {
      if (item.itemId === id) {
        name = item.itemName
      }
    })
    return name
  }

  const includeInSelected = (id: string) => {
    return updatedIds.value.indexOf(id) !== -1
  }

  const getIconStyle = (id: string) => {
    return includeInSelected(id) ? 'times' : 'plus'
  }

  const handleClickTitleIcon = () => {
    if (isSelectedAll.value) {
      deselectItemClassAll()
      return
    }
    updateItemClassAll()
  }

  const updateItemClassAll = () => {
    const ids = filteredDetail.value.map((item: any) => item.itemId)
    ctx.emit('handleItemClassAll', ids)
  }

  const updateItemClass = (id: string) => {
    ctx.emit('handleItemClass', id)
  }

  const deselectItemClassAll = () => {
    ctx.emit(
      'handleDeselectItemClassAll',
      props.items.map((item: any) => item.itemId)
    )
  }

  return {
    updatedIds,
    filteredDetail,
    isSelectedAll,
    getIconsColorClass,
    getIconsStyle,
    getItemName,
    includeInSelected,
    getIconStyle,
    handleClickTitleIcon,
    updateItemClassAll,
    updateItemClass,
    deselectItemClassAll
  }
}
