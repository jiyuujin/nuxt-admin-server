<template>
  <div class="pagination">
    <a
      href="#"
      :disabled="newVal === 1 ? disabled : !disabled"
      @click="prev"
    >
      Prev
    </a>
    <a
      href="#"
      :disabled="newVal === max ? disabled : !disabled"
      @click="next"
    >
      Next
    </a>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      disabled: true
    }
  },
  computed: {
    newVal: {
      get () {
        return this.page
      },
      set (value) {
        this.$emit('form-data', value)
      }
    }
  },
  methods: {
    prev() {
      this.newVal--
    },
    next() {
      this.newVal++
    }
  }
}
</script>

<style scoped>
.pagination {
  text-align: center;
  margin: 0 auto;
}

a {
  position: relative;
  display: inline-block;
  font-weight: bold;
  margin: 25px;
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
