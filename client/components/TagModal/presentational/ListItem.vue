<template>
  <div
    class="item-list-item"
    :class="[getSelectedClass, getSelectedItemsClass]"
    @click.prevent="handleClick"
  >
    <div class="item-name">
      {{ itemName }}
    </div>
    <div class="add-tag">
      <font-awesome-icon :icon="getIconStyle" class="icons" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, computed } from '@vue/composition-api'

type ListItemProps = {
  itemId: number
  itemName: string
  isSelected: boolean
  handleClickCallback: Function
  isSelectedItems: boolean
}

export default defineComponent({
  props: {
    itemId: {
      type: Number,
      required: true
    },
    itemName: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    },
    handleClickCallback: {
      type: Function,
      required: true
    },
    isSelectedItems: {
      type: Boolean,
      default: false
    }
  },
  setup(props: ListItemProps, ctx: SetupContext) {
    const getSelectedClass = computed(() => {
      return props.isSelected ? 'is-selected' : ''
    })

    const getSelectedItemsClass = computed(() => {
      return props.isSelectedItems ? 'is-selected-items' : ''
    })

    const getIconStyle = computed(() => {
      return props.isSelected ? 'times' : 'plus'
    })

    const handleClick = () => {
      props.handleClickCallback(props.itemId)
    }

    return {
      getSelectedClass,
      getSelectedItemsClass,
      getIconStyle,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
@import './list-item';
</style>
