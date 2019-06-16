<template>
  <div>
    <h3>
      Qiita
      <span>
        {{ list.length }} 件登録中
      </span>
    </h3>
    <div
      v-for="item in list"
      :key="item.title"
    >
      <h2>
        <a
          :href="item.url"
          target="_blank"
        >
          {{ item.title }}
        </a>
        <span>
          {{ diffTime(item.updated_at) }}
        </span>
      </h2>

      <div
        v-if="item.user"
        class="user"
      >
        <img
          v-if="item.user['profile_image_url']"
          :src="item.user['profile_image_url']"
          decoding="async"
        >
        {{ item.user['id'] }}
        <span v-if="item.user['location']">
          @{{ item.user['location'] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { getDiffTime } from '~/utils'
import { QiitaForm } from '~/types/database.types'

@Component({})
export default class QiitaList extends Vue {
  @Prop() list: QiitaForm[];
  @Prop() search: string;
  @Prop() tag: number;

  diffTime(t) {
    return getDiffTime(t)
  }
}
</script>

<style scoped>
h2 {
  font-size: 18px;
}

h2 a {
  color: #808080;
  text-decoration: none;
}

h2 span {
  float: right;
}

.user {
  font-size: 14px;
  margin-bottom: 20px;
}

.user img {
  width: 12px;
}
</style>
