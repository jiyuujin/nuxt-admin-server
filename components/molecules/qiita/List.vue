<template>
  <v-data-table
    :headers="header"
    :items="list"
    :search="search"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">
        <a
          :href="props.item.url"
          class="link-text"
          target="_blank"
        >
          <div style="text-align: left;">
            <div class="title-text">
              {{ props.item.title }}
            </div>
            <div
              v-if="props.item.user"
              class="user-text"
            >
              <img
                :src="props.item.user['profile_image_url']"
                v-if="props.item.user['profile_image_url']"
                width="30px"
                style="vertical-align: middle;"
              >
              {{ props.item.user['id'] }}
              <span v-if="props.item.user['location']">
                @{{ props.item.user['location'] }}
              </span>
            </div>
            <div class="tags-text">
                <span
                  v-for="(value, key) in props.item.tags"
                  :key="key"
                >
                  <v-chip label outline color="red">
                    {{ value.name }}
                  </v-chip>
                </span>
            </div>
          </div>
          <div style="float: right;">
            {{ date.getDiffTime(props.item.updated_at) }}
          </div>
        </a>
      </td>
      <td class="text-xs-center">
        <v-chip color="orange" text-color="white">
          <v-icon right>
            star
          </v-icon>
          {{ props.item.likes_count }}
        </v-chip>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import Date from '~/utils/date'
import { QIITA_HEADER_LIST } from '../../../utils/menu'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      date: Date,
      header: QIITA_HEADER_LIST
    }
  }
}
</script>

<style scoped>
.link-text{
  width: 100%;
  height: 100%;
  display: block;
  text-decoration: none;
}

.title-text {
  font-size: 18px;
  color: gray;
}
.user-text {
  font-size: 12px;
  color: darkblue;
}
.tags-text {
  font-size: 12px;
  color: red;
}
</style>
