<template>
  <div>
    <h3>
      主催イベント <span>{{ list.length }} 件登録中</span>
    </h3>
    <div
      v-for="item in list"
      :key="item.id"
    >
      <h2>
        {{ item.data.name }}
      </h2>
      <p>
        参加者: {{ item.data.participants }} 名を想定するも実際は {{ item.data.max_participants }} 名が参加した (LT: {{ item.data.lt }} 名) / 倍率 {{ item.data.max_participants / item.data.participants }} 倍
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { HostForm } from '~/types/database.types'
const StoryLabel = () => import('~/components/atoms/Label.vue')

@Component({
  components: {
    StoryLabel
  },
})
export default class HostList extends Vue {
  @Prop() list: HostForm[];

  // getText (id) {
  //   return CATEGORIES.find((category) => {
  //     if (category.value === id) return category
  //   }).text
  // }
}
</script>

<style scoped>
h2 {
  font-size: 18px;
}

p {
  margin-bottom: 20px;
  font-size: 12px;
  color: #00008b;
}
</style>
