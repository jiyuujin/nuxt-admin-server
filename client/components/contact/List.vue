<template>
    <div>
        <div v-for="item in list" :key="item.id">
            <template v-if="item.page === number">
                <div class="title">
                    {{ item.data.title }}
                </div>
                <div class="description">
                    {{ item.data.description }}
                </div>
            </template>
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
.title {
    font-weight: bold;
    font-size: 18px;
}

.description {
    margin-bottom: 20px;
    font-size: 12px;
    color: #8b0000;
}
</style>
