<template>
  <div>
    <div
      v-for="item in list"
      :key="item.id"
    >
      <div
        v-if="item.page === number"
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

        <Tag
          :list="item.data.tags"
          :categories="categories"
          class="tag"
        />

        <div
          v-if="item.data.description"
          class="description"
        >
          {{ item.data.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '~/components/atoms/Tag'
import { CATEGORIES, getDiffTime } from '~/utils/index'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    search: {
      type: String,
      required: true
    }
  },
  components: {
    Tag
  },
  data () {
    return {
      categories: CATEGORIES
    }
  },
  methods: {
    diffTime(t) {
      return getDiffTime(t)
    },
    editItem (item) {
      this.$emit('form-data', Object.assign({}, item))
    },
    deleteItem (item) {
      if (confirm(item.data.title + ' 削除しますか?')) {
        this.delete(item.id)
      }
    },
    async delete(key) {
      await this.$store.dispatch('removeTip', {
        key: key,
        data: []
      })
    }
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

.tag {
  margin-bottom: 10px;
}

.description {
  margin-bottom: 20px;
  font-size: 12px;
  color: #00008b;
}
</style>
