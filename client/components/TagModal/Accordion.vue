<template>
  <div v-if="filteredDetail.length !== 0">
    <div v-if="labelText" class="atoms-accordion-label">
      {{ labelText }}
    </div>
    <template v-cloak>
      <presentational-class
        :title="title"
        :item-length="filteredDetail.length"
        :is-selected-all="isSelectedAll"
        :handle-click-folder-icon-callback="handleClickTitleIcon"
      >
        <presentational-list-item
          v-for="(detail, index) in filteredDetail"
          :key="index"
          :is-selected="includeInSelected(detail['itemId'])"
          :item-id="detail['itemId']"
          :item-name="getItemName(detail['itemId'])"
          :handle-click-callback="updateItemClass"
        />
      </presentational-class>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import AccordionComposable from '~/composables/accordion'
import PresentationalClass from './presentational/Class.vue'
import PresentationalListItem from './presentational/ListItem.vue'

type AccordionProps = {
  labelText: string
  title: string
  items: object[]
  selectedIds: string[]
}

export default defineComponent({
  components: {
    PresentationalClass,
    PresentationalListItem
  },
  props: {
    labelText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    selectedIds: {
      type: Array,
      required: true
    }
  },
  setup(props: AccordionProps, ctx: SetupContext) {
    const accordionModule = AccordionComposable(props, ctx)
    return { ...accordionModule }
  },
  data() {
    return {
      isOpened: false
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/accordion';
</style>
