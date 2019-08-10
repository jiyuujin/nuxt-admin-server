<template>
    <div>
        <h3>Tip <span>{{ list.length }} 件登録中</span></h3>
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

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { TipForm } from '~/types/database.types'
import { getDiffTime } from '~/utils'

@Component({})
export default class TipList extends Vue {
    @Prop() list: TipForm[];
    @Prop() type: string[];
    @Prop() number: number;
    @Prop() search: string;

    diffTime(t) {
        return getDiffTime(t)
    }

    async editItem (item) {
        await this.$emit('form-data', Object.assign({}, item))
    }

    async deleteItem (item) {
        if (confirm(item.data.title + ' 削除しますか?')) {
            await this.delete(item.id)
        }
    }

    async delete (key) {
        await this.$store.dispatch('product/removeTip', {
            key: key,
            data: []
        })
    }

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
