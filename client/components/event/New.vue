<template>
    <div>
        <main-template :is-form="isForm">
            <j-input
                placeholder="名前"
                input-type="text"
                @handleInput="applyName"
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
            <j-select
                :options="localeOptions"
                :multiple="Boolean(false)"
                :selected-values="form.locale"
                @handleSelect="applyLocale"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="Eventを追加"
                variant-style="text"
                @handleClick="postEvent"
            ></j-button>
        </main-template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fetchEvents } from '~/services/eventService'
import { addEvent } from '~/services/eventService'
import { LOCALES } from '~/utils/tip'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

export default Vue.extend({
    components: {
        MainTemplate
    },
    data() {
        return {
            form: {
                id: 0 as number,
                name: '' as string,
                url: '' as string,
                locale: 0 as number
            },
            events: null,
            isForm: true as boolean
        }
    },
    computed: {
        localeOptions () {
            return LOCALES
        }
    },
    async mounted() {
        (this as any).events = await fetchEvents()
    },
    methods: {
        applyName(value) {
            this.form.name = value
        },
        applyUrl(value) {
            this.form.url = value
        },
        applyLocale(value) {
            this.form.locale = value
        },
        reset () {
            this.form.name = ''
            this.form.url = ''
            this.form.locale = 0
        },
        async postEvent () {
            await addEvent(this.form)
            this.reset()
        }
    }
})
</script>
