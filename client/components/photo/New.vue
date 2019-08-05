<template>
  <div>
    <main-template :is-form="isForm">
      <story-input
        v-model="form.name"
        placeholder="名前"
      />
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
      <story-button
        text="Photoを追加"
        @handleClick="postPhoto"
      />
    </main-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import firebase from 'firebase'
import { PhotoForm } from '~/types/database.types'
const MainTemplate = () => import('~/components/layout/MainTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    MainTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  }
})
export default class New extends Vue {
  form: PhotoForm = {
    name: '',
    content: ''
  };
  isForm: boolean = true;

  get photos () {
    return this.$store.state.product.photos
  }

  reset () {
    this.form.name = ''
    this.form.content = ''
  }

  async postPhoto () {
    await this.$store.dispatch('product/addPhoto', {
      name: this.form.name,
      content: this.form.content
    })
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
