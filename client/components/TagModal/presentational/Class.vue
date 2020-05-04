<template>
  <div>
    <div class="item-class-accordion">
      <div :class="{ 'is-opened': isAccordionOpened }" class="item-class">
        <a
          class="item-class-name"
          @click.prevent="isAccordionOpened = !isAccordionOpened"
        >
          <font-awesome-icon icon="caret-right" class="icon" />
          {{ title }}
          <small class="item-count">({{ itemLength }})</small>
        </a>
        <a class="add-tag">
          <div
            :class="getIconsColorClass"
            class="add-tag-btn"
            @click.prevent="handleClickFolderIcon"
          >
            <font-awesome-icon :icon="getIconsStyle" class="icons" />
          </div>
        </a>
      </div>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-if="isAccordionOpened" class="item-list">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },
    itemLength: {
      type: Number as PropType<number>,
      default: 0
    },
    isSelectedAll: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    handleClickFolderIconCallback: {
      type: Function as PropType<Function>,
      required: true
    }
  },
  data() {
    return {
      isAccordionOpened: false
    }
  },
  computed: {
    getIconsColorClass() {
      if (this.isSelectedAll) {
        return 'isSelected'
      }
      return ''
    },

    getIconsStyle() {
      if (this.isSelectedAll) {
        return 'folder-minus'
      }
      return 'folder-plus'
    }
  },
  methods: {
    handleClickFolderIcon() {
      this.handleClickFolderIconCallback()
    },
    beforeEnter: function (el: any) {
      el.style.height = '0'
    },
    enter: function (el: any) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave: function (el: any) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave: function (el: any) {
      el.style.height = '0'
    }
  }
})
</script>

<style lang="sass" scoped>
.item-class-accordion
    border-bottom: 1px solid #ddd

.item-class
    display: flex
    justify-content: space-between
    align-items: stretch
    &:hover
        background-color: #f7f7f7
    .item-class-name
        padding: 0.65rem
        width: 100%
        color: #333
        text-decoration: none
        text-align: left
        cursor: pointer
        .icon
            margin: 0 0.65rem
            transition: all 0.1s ease-in-out
        .item-count
            color: #999

    .add-tag
        padding-right: 0.5rem
        display: flex
        align-items: center
        justify-content: center
        .add-tag-btn
            padding: 0.4rem
            border-radius: 3px
            border: 1px solid #ddd
            line-height: 0
            cursor: pointer
            &.isSelected
                color: #bc0000

.is-opened
    .item-class-name
        .icon
            transform: rotate(90deg)

.item-list
    transition: height 0.15s ease-in-out
    overflow: hidden
</style>
