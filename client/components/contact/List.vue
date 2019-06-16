<template>
  <div>
    <div
      v-for="item in list"
      :key="item.id"
    >
      <h2
        v-if="item.page === number"
      >
        <span>
          {{ item.data.category.text }}
        </span>
        ・
        {{ item.data.title }}
      </h2>

      <div class="description">
        {{ item.data.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ContactForm } from '~/types/database.types'

@Component({})
export default class ContactList extends Vue {
  @Prop() list: ContactForm[];
  @Prop() number: number;
}
</script>

<style scoped>
h2 {
  font-size: 18px;
}

.description {
  margin-bottom: 20px;
  font-size: 12px;
  color: #8b0000;
}
</style>
