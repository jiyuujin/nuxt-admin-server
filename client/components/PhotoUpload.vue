<template>
  <j-form title="名前">
    <input type="file" @change="onFileChange" />
    <j-button text="Photoを追加" @handleClick="postPhoto" />
    <div v-if="form.content" style="margin-top: 12px;">
      アップロード結果:
      <div class="preview">
        <img :src="form.content" :alt="form.name" decoding="async" />
      </div>
    </div>
  </j-form>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
import { PhotoForm } from '~/types/database'
import { addPhoto } from '~/services/photoService'

export default Vue.extend({
  data() {
    return {
      form: {
        name: '' as string,
        content: '' as string
      } as PhotoForm
    }
  },
  methods: {
    reset() {
      this.form.name = ''
      this.form.content = ''
    },
    async postPhoto() {
      await addPhoto(this.form)
      this.reset()
    },
    onFileChange(e) {
      const files = e.target.files
      this.form.name = files[0].name.replace(/.png/g, '')

      const fr = new FileReader()
      fr.readAsDataURL(files[0])
      fr.addEventListener('load', () => {
        this.upload(files[0])
      })
    },
    upload(file) {
      const storageRef = firebase.storage().ref().child(this.form.name)
      storageRef.put(file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.form.content = downloadURL
        })
      })
    }
  }
})
</script>

<style scoped>
.preview img {
  width: 60px;
}
</style>
