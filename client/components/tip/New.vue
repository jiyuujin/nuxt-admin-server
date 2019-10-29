<template>
    <div v-if="events">
        <main-template :is-form="isForm">
            <j-input
                placeholder="タイトル"
                input-type="text"
                @handleInput="applyTitle"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-input
                placeholder="URL"
                input-type="text"
                @handleInput="applyUrl"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-input
                placeholder="詳細"
                input-type="text"
                @handleInput="applyDescription"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="categoryOptions"
                :multiple="Boolean(false)"
                :selected-values="form.tags"
                @handleSelect="applyTags"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="eventOptions"
                :multiple="Boolean(false)"
                :selected-values="form.event"
                @handleSelect="applyEvent"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="Tipを追加"
                variant-style="text"
                @handleClick="postTip"
            ></j-button>
    </main-template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { addTip } from '~/services/tipService'
import { fetchEvents } from '~/services/eventService'
import { CATEGORIES } from '~/utils/tip'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

export default Vue.extend({
    components: {
        MainTemplate
    },
    data() {
        return {
            form: {
                title: '' as string,
                url: '' as string,
                description: '' as string,
                tags: 0 as number,
                event: 0 as number
            },
            events: null,
            isForm: true as boolean
        }
    },
    computed: {
        categoryOptions() {
            return CATEGORIES
        },
        eventOptions() {
            let array: object[] = [];
            (this as any).events.item.forEach((item) => {
                array.push({
                    value: item.data.id,
                    text: item.data.name
                })
            })
            return array
        }
    },
    async mounted() {
        (this as any).events = await fetchEvents()
    },
    methods: {
        applyTitle(value) {
            this.form.title = value
        },
        applyUrl(value) {
            this.form.url = value
        },
        applyDescription(value) {
            this.form.description = value
        },
        applyEvent(value) {
            this.form.event = value
        },
        applyTags (value) {
            this.form.tags = value
        },
        reset () {
            this.form.title = ''
            this.form.url = ''
            this.form.description = ''
            this.form.tags = 0
            this.form.event = 0
        },
        async postTip () {
            await addTip(this.form)
            this.reset()
        }
    }
})
</script>
