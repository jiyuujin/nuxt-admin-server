<template>
  <div>
    <a
      href="#"
      @click="handle"
    >
      {{ actionName }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    actionName: {
      type: String,
      default: ''
    }
  },
  methods: {
    handle (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
a {
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0;
  text-decoration: none;
  color: #42b883;
}

a:before{
  position: absolute;
  content: '';
  width: 100%;
  height: 4px;
  top:100%;
  left: 0;
  border-radius: 3px;
  background: #42b883;
  transition: .2s;
}

a:hover:before {
  top: -webkit-calc(100% - 3px);
  top: calc(100% - 3px);
}
</style>
