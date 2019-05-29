<template>
  <div>
    <form-template>
      <story-input
        v-model="form.name"
        placeholder="名前"
      />
    </form-template>
    <form-template>
      <input
        type="file"
        @change="onFileChange"
      />
      <div
        id="preview"
        class="preview"
      />
    </form-template>
    <form-template>
      <story-button
        text="Photoを追加"
        @click="postPhoto"
      />
    </form-template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import firebase from 'firebase'
import { PhotoForm } from '~/types/database.types'
const FormTemplate = () => import('~/components/templates/FormTemplate.vue')
const StoryInput = () => import('~/components/atoms/Input.vue')
const StorySelect = () => import('~/components/atoms/Select.vue')
const StoryButton = () => import('~/components/atoms/Button.vue')

@Component({
  components: {
    FormTemplate,
    StoryInput,
    StorySelect,
    StoryButton
  },
  computed: {
    ...mapState({
      photos: state => state.product.photos
    })
  },
})
export default class New extends Vue {
  form: PhotoForm = {
    name: '',
    content: ''
  };

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
