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
      <!--
      <svg-element :name="getIconStyle" />
      -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, computed } from '@vue/composition-api'

// const SvgElement = () => import('~/components/SvgElement.vue')

type ListItemProps = {
  itemId: number
  itemName: string
  isSelected: boolean
  handleClickCallback: Function
  isSelectedItems: boolean
}

export default defineComponent({
  components: {
    // SvgElement
  },
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
