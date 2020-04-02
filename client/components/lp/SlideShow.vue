<template>
  <div class="slideshow">
    <input id="switch1" type="radio" name="slideshow" checked />
    <input id="switch2" type="radio" name="slideshow" />
    <input id="switch3" type="radio" name="slideshow" />
    <input id="switch4" type="radio" name="slideshow" />
    <div class="slideshow-contents">
      <section id="slide1">
        <img src="../../static/blog.png" />
      </section>
      <section id="slide2">
        <img src="../../static/profile.png" />
      </section>
      <section id="slide3">
        <img src="../../static/admin.png" />
      </section>
      <section id="slide4">
        <img src="../../static/white.png" />
      </section>
    </div>
    <p class="arrow prev">
      <i class="ico" />
      <label for="switch1" />
      <label for="switch2" />
      <label for="switch3" />
      <label for="switch4" />
    </p>
    <p class="arrow next">
      <i class="ico" />
      <label for="switch1" />
      <label for="switch2" />
      <label for="switch3" />
      <label for="switch4" />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  //
})
</script>

<style lang="scss" scoped>
@import '@/assets/slideshow.scss';
</style>
