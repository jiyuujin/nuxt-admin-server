<template>
  <div>
    <!--
    <h3>
      Tip <span>{{ list.length }} 件登録中</span>
    </h3>
    <div
      v-for="item in list"
      :key="item.id"
    >
      <div
        v-if="item.page === number"
        style="margin-bottom: 10px;"
      >
        <h2>
          <a
            :href="item.data.url"
            target="_blank"
          >
            {{ item.data.title }}
          </a>
          <span>
          {{ diffTime(item.data.time) }}
        </span>
        </h2>

        <span
          v-for="(tag, index) in item.data.tags"
          :key="index"
        >
          <story-label :text="getText(tag)" />
        </span>

        <div
          v-if="item.data.description"
          class="description"
        >
          {{ item.data.description }}
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CATEGORIES, getDiffTime } from '~/utils/index'
const StoryLabel = () => import('~/components/atoms/Label.vue')

@Component({
  components: {
    StoryLabel
  },
})
export default class TipList extends Vue {
  @Prop() type: string[];
  @Prop() number: number;
  @Prop() search: string;
  categories = CATEGORIES;

  diffTime(t) {
    return getDiffTime(t)
  }

  editItem (item) {
    this.$emit('form-data', Object.assign({}, item))
  }

  deleteItem (item) {
    if (confirm(item.data.title + ' 削除しますか?')) {
      this.delete(item.id)
    }
  }

  async delete (key) {
    await this.$store.dispatch('product/removeTip', {
      key: key,
      data: []
    })
  }

  getText (id) {
    return CATEGORIES.find((category) => {
      if (category.value === id) return category
    }).text
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

.description {
  margin-bottom: 20px;
  font-size: 12px;
  color: #00008b;
}
</style>
