<template>
  <div>
    <h3>
      Flight
    </h3>
    <Graph
      :data="list"
    />
  </div>
</template>

<script>
import Graph from './Graph'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  components: {
    Graph
  }
}
</script>

<style scoped>

</style>
