<template>
  <v-data-table
    :headers="header"
    :items="list"
    :search="search"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">
        <a
          :href="props.item.url"
          v-if="props.item.url"
          class="link-text"
          target="_blank"
        >
          <div style="text-align: left;">
            <div class="title-text">
              <span v-if="props.item.event !== 0">
                <v-chip
                  label
                  color="pink"
                  text-color="white"
                >
                  <v-icon left>label</v-icon>{{ event(props.item.event) }}
                </v-chip>
              </span>
              {{ props.item.title }}
            </div>
            <div
              v-if="props.item.description"
              class="description-text"
            >
              {{ props.item.description }}
            </div>
            <div>
              <Tag
                :list="props.item.tags"
                :categories="categories"
              />
            </div>
          </div>
          <div style="float: right;">
            {{ date.getDiffTime(props.item.time) }}
          </div>
        </a>
      </td>
      <td class="justify-center layout px-0">
        <v-icon
          small
          class="mr-2"
          @click="editItem(props.item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(props.item)"
        >
          delete
        </v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import Tag from '~/components/atoms/Tag'
import Date from '~/utils/date'
import { TIP_HEADER_LIST } from '../../../utils/menu'
import { CATEGORIES } from '~/utils/categories'
import { getEventName } from '../../../utils/events'
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
  components: {
    Tag
  },
  data () {
    return {
      header: TIP_HEADER_LIST,
      date: Date,
      categories: CATEGORIES
    }
  },
  // computed: {
  //   categories () {
  //     return CATEGORIES.map((category) => {return category.name})
  //   }
  // },
  methods: {
    event(id) {
      return getEventName(id)
    },
    editItem (item) {
      this.$emit('form-data', Object.assign({}, item))
    },
    deleteItem (item) {
      if (confirm(item.title + ' 削除しますか?')) {
        this.delete(item['.key'])
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
.description-text {
  font-size: 12px;
  color: darkblue;
}
</style>
