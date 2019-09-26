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
                :selected-values="tags"
                @handleSelect="applyTags"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-select
                :options="eventOptions"
                :multiple="Boolean(false)"
                :selected-values="event"
                @handleSelect="applyEvent"
            ></j-select>
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="Tipを追加"
                width="160px"
                variant-style="text"
                @handleClick="postTip"
            ></j-button>
    </main-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { CATEGORIES } from '~/utils'
const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

@Component({
    components: {
        MainTemplate
    },
    computed: {
        categoryOptions (this: NewTip) {
            let array: string[] = []
            CATEGORIES.forEach((item) => {
                array.push(item.text)
            })
            return array
        },
        eventOptions (this: NewTip) {
            let array: string[] = []
            this.$store.state.product.events.item.forEach((item) => {
                array.push(item.data.name)
            })
            return array
        }
    },
    async created () {
        await this.$store.dispatch('product/fetchEvents')
    },
})
export default class NewTip extends Vue {
    title: string = '';
    url: string = '';
    description: string = '';
    tags: number[] = [];
    event: number = 0;
    isForm: boolean = true;

    get events () {
        return this.$store.state.product.events
    }

    applyTitle(value) {
        this.title = value
    }

    applyUrl(value) {
        this.url = value
    }

    applyDescription(value) {
        this.description = value
    }

    applyEvent(value) {
        this.event = value
    }

    applyTags (value) {
        this.tags = value
    }

    reset () {
        this.title = ''
        this.url = ''
        this.description = ''
        this.tags = []
        this.event = 0
    }

    async postTip () {
        await this.$store.dispatch('product/addTip', {
            title: this.title,
            url: this.url,
            description: this.description,
            tags: [this.tags],
            event: this.event,
            time: dayjs().format('')
        })
        this.reset()
    }
}
</script>
