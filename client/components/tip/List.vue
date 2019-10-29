<template>
    <div>
        <h3>Tip <span>{{ list.length }} 件登録中</span></h3>
        <div v-for="item in list" :key="item.id">
            <template v-if="item.page === number">
                <j-form :title="diffTime(item.data.time)">
                    <a :href="item.data.url" target="_blank" rel="noopener">
                        {{ item.data.title }}
                    </a>
                </j-form>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getDiffTime } from '~/utils'

export default Vue.extend({
    props: {
        list: {
            type: Array
        },
        type: {
            type: Array
        },
        number: {
            type: Number
        }
    },
    methods: {
        diffTime(t) {
            return getDiffTime(t)
        }
    }
})
</script>
