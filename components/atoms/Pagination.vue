<template>
  <div class="text-xs-center pt-2">
    <v-btn
      v-model="newVal"
      :disabled="newVal === 1 ? disabled : !disabled"
      @click="prev"
    >
      Prev
    </v-btn>
    <v-btn
      v-model="newVal"
      :disabled="newVal === max ? disabled : !disabled"
      @click="next"
    >
      Next
    </v-btn>
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
button {
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0;
  text-decoration: none;
  color: #67c5ff;
}

button:before{
  position: absolute;
  content: '';
  width: 100%;
  height: 4px;
  top:100%;
  left: 0;
  border-radius: 3px;
  background:#67c5ff;
  transition: .2s;
}

button:hover:before {
  top: -webkit-calc(100% - 3px);
  top: calc(100% - 3px);
}
</style>
