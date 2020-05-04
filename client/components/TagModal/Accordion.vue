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
import Vue, { PropType } from 'vue'
import PresentationalClass from './presentational/Class.vue'
import PresentationalListItem from './presentational/ListItem.vue'

export default Vue.extend({
  components: {
    PresentationalClass,
    PresentationalListItem
  },
  props: {
    labelText: {
      type: String as PropType<string>,
      default: ''
    },
    title: {
      type: String as PropType<string>,
      required: true
    },
    items: {
      type: Array as PropType<object[]>,
      default: function () {
        return []
      }
    },
    selectedIds: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  data() {
    return {
      isOpened: false
    }
  },
  computed: {
    updatedIds() {
      return this.selectedIds
    },
    filteredDetail() {
      if (this.items === null) {
        return []
      }
      return this.items
    },
    isSelectedAll() {
      const allItemIds = this.items.map((item: any) => item.itemId)
      for (let i = 0; i < allItemIds.length; i++) {
        if (!this.updatedIds.includes(allItemIds[i])) {
          return false
        }
      }
      return true
    },
    getIconsColorClass() {
      if (this.isSelectedAll) {
        return 'exists'
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
    getItemName(id: string) {
      let name = ''
      this.items.map((item: any) => {
        if (item.itemId === id) {
          name = item.itemName
        }
      })
      return name
    },
    includeInSelected(id: string) {
      return this.updatedIds.indexOf(id) !== -1
    },
    getIconStyle(id: string) {
      return this.includeInSelected(id) ? 'times' : 'plus'
    },
    handleClickTitleIcon() {
      if (this.isSelectedAll) {
        this.deselectItemClassAll()
        return
      }
      this.updateItemClassAll()
    },
    updateItemClassAll() {
      const ids = this.filteredDetail.map((item: any) => item.itemId)
      this.$emit('handleItemClassAll', ids)
    },
    updateItemClass(id: string) {
      this.$emit('handleItemClass', id)
    },
    deselectItemClassAll() {
      this.$emit(
        'handleDeselectItemClassAll',
        this.items.map((item: any) => item.itemId)
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.atoms-accordion-label {
  margin-top: 1rem;
  padding: 0 0.6rem 0.6rem;
  border-bottom: 1px solid #ddd;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  color: #0084cf;
}
</style>
