<template>
  <v-data-table
    :headers="header"
    :items="list"
    class="elevation-1">
    <template
      slot="items"
      slot-scope="props"
    >
      <td class="text-xs-center">
        {{ props.item.title }}
      </td>
      <td class="text-xs-center">
        <img :src="props.item.imagePath" :alt="props.item.time">
      </td>
      <td class="justify-center layout px-0">
        <v-icon
          small
          id="download"
          @click="download(props.item)"
        >
          mdi-download
        </v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { IMAGE_HEADER_LIST } from '../../../utils/menu'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      header: IMAGE_HEADER_LIST
    }
  },
  methods: {
    download (items) {
      const url = window.URL || window.webkitURL
      if (confirm(items.title + '\nダウンロードしますか?')) {
        const blob = this.toBlob(items.imagePath)
        if (blob !== false) {
          let a = document.createElement('a')
          a.download = items.title
          a.href = url.createObjectURL(blob)
          a.click()
        }
      }
    },
    toBlob (base64) {
      const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
      const bin = atob(base64.replace(/^.*,/, ''))
      let buffer = new Uint8Array(bin.length)
      for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
      }
      try {
        return new Blob([bom, buffer.buffer], {
          type: 'image/png'
        })
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 50px;
}
</style>
