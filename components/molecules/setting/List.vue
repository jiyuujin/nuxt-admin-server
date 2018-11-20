<template>
  <v-data-table
    :headers="header"
    :items="list"
    hide-actions
    class="elevation-1"
    style="margin-top: 5px; margin-bottom: 5px;"
  >
    <template slot="items" slot-scope="props">
      <td
        :style="props.item.error_message !== null ? 'background-color: #CC0000; color: #fff;' : null"
      >
        <p class="netlify__name">
          {{ props.item.name }}
        </p>
        <p class="netlify__build_settings">
          {{ props.item.build_settings.dir }} / {{ props.item.build_settings.cmd }}
        </p>
        <p
          v-if="props.item.error_message"
          class="netlify_error_message"
        >
          {{ props.item.error_message }}
        </p>
      </td>
      <td>
        <a
          :href="props.item.ssl_url"
          target="_blank"
        >
          <img
            :src="'./' + icon + '.png'"
            :alt="icon"
          >
        </a>
        <a
          :href="props.item.build_settings.repo_url"
          target="_blank"
        >
          <img
            :src="'./' + props.item.build_settings.provider + '.png'"
            :alt="props.item.build_settings.provider"
          >
        </a>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { SETTING_HEADER_LIST } from '../../../utils/menu'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      icon: 'netlify',
      header: SETTING_HEADER_LIST
    }
  }
}
</script>

<style scoped>
.netlify__name {
  font-size: 12px;
}
.netlify__build_settings {
  font-size: 8px;
}
.netlify__ssl_url {
  font-size: 8px;
}
.netlify_error_message {
  font-size: 8px;
}
a img {
  width: 25px;
  height: 25px;
}
</style>
