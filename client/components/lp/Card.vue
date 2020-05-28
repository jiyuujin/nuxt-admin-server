<template>
  <j-app-card
    :title="title"
    :icon="icon"
    :tags="tags"
    :price="price"
    :tooltip="tooltip"
    :handle-submit-click-callback="linkToUrl(url)"
    :promotion="promotion"
    :rate="rate"
    :description="description"
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },
    icon: {
      type: String as PropType<string>,
      default: ''
    },
    tags: {
      type: Array,
      default: function() {
        return []
      }
    },
    price: {
      type: String as PropType<string>,
      default: ''
    },
    tooltip: {
      type: String as PropType<string>,
      default: ''
    },
    url: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    promotion: {
      type: String as PropType<string>,
      default: ''
    },
    rate: {
      type: Number as PropType<number>,
      default: 1
    },
    description: {
      type: String as PropType<string>,
      default: ''
    }
  },
  methods: {
    replace(number: number): string {
      return String(number).replace('.', '-')
    },
    linkToUrl(url: string) {
      if (url) {
        // window.location.href = url
      }
    }
  }
})
</script>
