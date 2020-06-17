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
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    itemId: {
      type: Number as PropType<number>,
      required: true
    },
    itemName: {
      type: String as PropType<string>,
      required: true
    },
    isSelected: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    handleClickCallback: {
      type: Function as PropType<Function>,
      required: true
    },
    isSelectedItems: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  computed: {
    getSelectedClass() {
      return this.isSelected ? 'is-selected' : ''
    },

    getSelectedItemsClass() {
      return this.isSelectedItems ? 'is-selected-items' : ''
    },

    getIconStyle() {
      return this.isSelected ? 'times' : 'plus'
    }
  },
  methods: {
    handleClick() {
      ;(this as any).handleClickCallback((this as any).itemId)
    }
  }
})
</script>

<style lang="sass" scoped>
.item-list-item
    display: flex
    justify-content: space-between
    align-items: stretch
    transition: all 0.15s linear
    .item-name
        padding: 0.65rem
        padding-left: 3rem
        width: 100%
        color: #000
        text-align: left
        cursor: pointer
        .warehouse
            color: #fff
            background-color: #00aaac
            padding: 4px 4px
            display: inline-block
            line-height: 100%
            cursor: default
            font-size: 11px
            border-radius: 4px
            margin-right: 4px
        .ec
            color: #fff
            background-color: #ffb900
            padding: 4px 4px
            display: inline-block
            line-height: 100%
            cursor: default
            font-size: 11px
            border-radius: 4px
            margin-right: 4px
        .pause
            color: #fff
            background-color: #bbb
            padding: 4px 4px
            display: inline-block
            line-height: 100%
            cursor: default
            font-size: 11px
            border-radius: 4px
    .add-tag
        width: 47px
        display: flex
        justify-content: center
        align-items: center
        color: #0084cf
        cursor: pointer

    &:hover
        background-color: #f7f7f7

    &.is-selected
        .item-name
            opacity: 0.5
        .add-tag
            color: #bc0000

    &.is-selected-items
        .item-name
            padding-left: 0.65rem
        &.is-selected
            .item-name
                opacity: 1
</style>
