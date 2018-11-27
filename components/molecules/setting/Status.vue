<template>
  <div>
    <h3>
      Setting
    </h3>
    <v-data-table
      :headers="header"
      :items="social"
      hide-actions
      class="elevation-1"
      style="margin-top: 5px; margin-bottom: 5px;"
    >
      <template slot="items" slot-scope="props">
        <td>
          <p class="social__name">
            {{ props.item.name }}
          </p>
        </td>
        <td>
          <a
            :href="props.item.url"
            target="_blank"
          >
            <img
              :src="'./' + props.item.name + '.png'"
              :alt="props.item.name"
            >
          </a>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { SOCIAL_MENU_LIST, SETTING_HEADER_LIST } from '../../../utils/menu'
export default {
  data() {
    return {
      social: SOCIAL_MENU_LIST,
      header: SETTING_HEADER_LIST
    }
  }
}
</script>

<style scoped>
img {
  width: 25px;
  height: 25px;
}
</style>
