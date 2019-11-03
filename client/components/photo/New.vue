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
            <input
                type="file"
                @change="onFileChange"
            />
            <div>
                アップロード結果:
                <div
                    v-if="form.content"
                    class="preview"
                >
                    <img
                        :src="form.content"
                        :alt="form.name"
                        decoding="async"
                    />
                </div>
            </div>
        </main-template>
        <main-template :is-form="isForm">
            <j-button
                text="Photoを追加"
                variant-style="text"
                @handleClick="postPhoto"
            ></j-button>
        </main-template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase'
import { PhotoForm } from '~/types/database.types'
import { addPhoto } from '~/services/photoService'

const MainTemplate = () => import('~/components/layout/MainTemplate.vue')

@Component({
    components: {
        MainTemplate
    }
})
export default class New extends Vue {
    form: PhotoForm = {
        name: '',
        content: ''
    };
    isForm: boolean = true;

    applyName(value) {
        this.form.name = value
    }

    reset () {
        this.form.name = ''
        this.form.content = ''
    }

    async postPhoto () {
        await addPhoto(this.form)
        this.reset()
    }

    onFileChange (e) {
        const files = e.target.files
        this.form.name = files[0].name.replace(/.png/g, '')

        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
            this.upload(files[0])
        });
    }

    upload (file) {
        const storageRef = firebase.storage().ref().child(this.form.name);
        storageRef.put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(downloadURL => {
                        this.form.content = downloadURL;
                    });
            });
    }
}
</script>

<style scoped>
.preview img {
  width: 60px;
}
</style>
