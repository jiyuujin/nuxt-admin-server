<template>
  <div>
    <div class="item-class-accordion">
      <div :class="{ 'is-opened': state.isAccordionOpened }" class="item-class">
        <a
          class="item-class-name"
          @click.prevent="state.isAccordionOpened = !state.isAccordionOpened"
        >
          <!--
          <svg-element name="caret-right" />
          -->
          {{ title }}
          <small class="item-count">({{ itemLength }})</small>
        </a>
        <a class="add-tag">
          <div
            :class="getIconsColorClass"
            class="add-tag-btn"
            @click.prevent="handleClickFolderIcon"
          >
            <!--
            <svg-element :name="getIconsStyle" />
            -->
          </div>
        </a>
      </div>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-if="state.isAccordionOpened" class="item-list">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  computed,
  reactive
} from '@vue/composition-api'

// const SvgElement = () => import('~/components/SvgElement.vue')

type ClassProps = {
  title: string
  itemLength: number
  isSelectedAll: boolean
  handleClickFolderIconCallback: Function
}

export default defineComponent({
  components: {
    // SvgElement
  },
  props: {
    title: {
      type: String,
      required: true
    },
    itemLength: {
      type: Number,
      default: 0
    },
    isSelectedAll: {
      type: Boolean,
      required: true
    },
    handleClickFolderIconCallback: {
      type: Function,
      required: true
    }
  },
  setup(props: ClassProps, ctx: SetupContext) {
    const state = reactive({
      isAccordionOpened: false
    })

    const getIconsColorClass = computed(() => {
      if (props.isSelectedAll) {
        return 'isSelected'
      }
      return ''
    })

    const getIconsStyle = computed(() => {
      if (props.isSelectedAll) {
        return 'folder-minus'
      }
      return 'folder-plus'
    })

    const handleClickFolderIcon = () => {
      props.handleClickFolderIconCallback()
    }

    const beforeEnter = (el: any) => {
      el.style.height = '0'
    }

    const enter = (el: any) => {
      el.style.height = el.scrollHeight + 'px'
    }

    const beforeLeave = (el: any) => {
      el.style.height = el.scrollHeight + 'px'
    }

    const leave = (el: any) => {
      el.style.height = '0'
    }

    return {
      state,
      getIconsColorClass,
      getIconsStyle,
      handleClickFolderIcon,
      beforeEnter,
      enter,
      beforeLeave,
      leave
    }
  }
})
</script>

<style lang="scss" scoped>
@import './class';
</style>
