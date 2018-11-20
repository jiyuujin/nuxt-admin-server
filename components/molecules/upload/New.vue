<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
      sm6
      md3
    >
      <input
        type="file"
        @change="onFileChange"
      >
      <v-text-field
        label="画像ファイル名"
        v-model="imageName"
      />
      <img
        v-if="imagePath"
        :src="imagePath"
      >
      <v-btn
        round
        dark
        color="primary"
        @click="upload"
      >
        Upload
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
import Validation from '~/utils/validation'
export default {
  data () {
    return {
      imageName: '',
      imagePath: '',
      errorText: ''
    }
  },
  methods: {
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return
      this.createImage(files[0]);
    },
    createImage (file) {
      const reader = new FileReader();
      const self = this;
      reader.onload = (e) => {
        self.imagePath = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    upload () {
      this.errorText = '';
      if (!Validation.isValid(this.imagePath) && !Validation.isValid(this.imageName)) {
        this.postImage();
      } else {
        this.errorText = '正しく入力してください'
      }
    },
    async postImage () {
      await this.$store.dispatch('addImage', {
        time: moment().format(''),
        title: this.imageName,
        imagePath: this.imagePath
      })
    }
  }
}
</script>

<style scoped>
img {
  width: 50px;
}
</style>
