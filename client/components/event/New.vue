<template>
    <div>
        <main-template :is-form="isForm">
            <j-input
                placeholder="名前"
                input-type="text"
                width="80%"
                @handleInput="applyName"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-input
                placeholder="URL"
                input-type="text"
                width="80%"
                @handleInput="applyUrl"
            ></j-input>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="localeOptions"
                :multiple="Boolean(false)"
                :selected-values="form.locale"
                width="80%"
                @handleSelect="applyLocale"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="Eventを追加"
                width="128px"
                variant-style="text"
                @handleClick="postEvent"
            ></j-button>
        </main-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { EventForm } from '~/types/database.types'
import { LOCALES } from '~/utils'
const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

@Component({
    components: {
        MainTemplate
    },
    computed: {
        localeOptions () {
            let array: string[] = []
            LOCALES.forEach(locale => {
                array.push(locale.text)
            })
            return array
        }
    },
})
export default class New extends Vue {
    form: EventForm = {
        id: 0,
        name: '',
        url: '',
        locale: 0
    };
    isForm: boolean = true;

    get events () {
        return this.$store.state.product.events
    }

    applyName(value) {
        this.form.name = value
    }

    applyUrl(value) {
        this.form.url = value
    }

    applyLocale(value) {
        this.form.locale = value
    }

    reset () {
        this.form.name = ''
        this.form.url = ''
        this.form.locale = 0
    }

    async postEvent () {
        await this.$store.dispatch('product/addEvent', {
            name: this.form.name,
            url: this.form.url,
            locale: this.form.locale
        })
        this.reset()
    }
}
</script>
