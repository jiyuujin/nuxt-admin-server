<template>
    <dialog v-if="events && dialog">
        <div>
            <main-template :is-form="isForm">
                <j-input
                    placeholder="タイトル"
                    input-type="text"
                    width="80%"
                    @handleInput="applyTitle"
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
                <j-input
                    placeholder="詳細"
                    input-type="text"
                    width="80%"
                    @handleInput="applyDescription"
                ></j-input>
            </main-template>
            <main-template :is-form="isForm">
                <j-select
                    :options="categoryOptions"
                    :multiple="Boolean(false)"
                    :selected-values="editedForm.tags"
                    width="80%"
                    @handleSelect="applyTags"
                ></j-select>
            </main-template>
            <main-template :is-form="isForm">
                <j-select
                    :options="eventOptions"
                    :multiple="Boolean(false)"
                    :selected-values="editedForm.event"
                    width="80%"
                    @handleSelect="applyEvent"
                ></j-select>
            </main-template>
            <main-template :is-form="isForm">
                <j-button
                    text="削除する"
                    width="128px"
                    variant-style="text"
                    @handleClick="close"
                ></j-button>
                <j-button
                    text="保存する"
                    width="128px"
                    variant-style="text"
                    @handleClick="save"
                ></j-button>
            </main-template>
        </div>
    </dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CATEGORIES } from '~/utils'
import { TipForm } from '~/types/database.types'
const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

@Component({
    components: {
        MainTemplate
    },
    computed: {
        categoryOptions (this: EditTip) {
            let array: string[] = []
            CATEGORIES.forEach((item) => {
                array.push(item.text)
            })
            return array
        },
        eventOptions (this: EditTip) {
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
export default class EditTip extends Vue {
    @Prop() editedForm: TipForm;
    @Prop() dataKey: string;
    isForm: boolean = true;

    get dialog () {
        return this.$store.state.product.dialog
    }

    get events () {
        return this.$store.state.product.events
    }

    applyTitle(value) {
        this.editedForm.title = value
    }

    applyUrl(value) {
        this.editedForm.url = value
    }

    applyDescription(value) {
        this.editedForm.description = value
    }

    applyEvent(value) {
        this.editedForm.event = value
    }

    applyTags (value) {
        this.editedForm.tags = value
    }

    async close () {
        await this.$store.dispatch('product/removeDialog')
    }

    async save () {
        await this.$store.dispatch('product/updateTip', {
            'key': this.dataKey,
            'data': this.editedForm
        })
        this.close()
    }
}
</script>
