<template>
    <div>
        <h3>Tip <span>{{ list.length }} 件登録中</span></h3>
        <div v-for="item in list" :key="item.id">
            <template v-if="item.page === number">
                <j-form :title="diffTime(item.data.time)">
                    <a :href="item.data.url" target="_blank" rel="noopener">
                        {{ item.data.title }}
                    </a>
                    <div
                        v-for="tag in tagTexts(item.data.tags)"
                        :key="tag"
                    >
                        <j-label :tag-text="tag"></j-label>
                    </div>
                </j-form>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CATEGORIES } from '~/utils/tip'
import { getDiffTime } from '~/utils'

export default Vue.extend({
    props: {
        list: {
            type: Array
        },
        number: {
            type: Number
        }
    },
    methods: {
        diffTime(t) {
            return getDiffTime(t)
        },
        tagTexts(tagId: number) {
            let result: string[] = []
            CATEGORIES.map(category => {
                if (category.value === tagId) {
                    result.push(category.text)
                }
            })
            return result
        }
    }
})
</script>
