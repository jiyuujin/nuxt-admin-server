<template>
  <div class="card">
    <img
      :src="`./${getAirlineText(airlineId).toLowerCase()}.png`"
      :alt="name"
    >
    <div class="time">
      {{ time }}
    </div>
    <div class="card-text">
      <p>
        {{ name }}({{ boardingType }})
      </p>
      <p>
        {{ route }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { getAirlineName } from '~/utils';

@Component({})
export default class Card extends Vue {
  @Prop() airlineId: string;
  @Prop() boardingType: string;
  @Prop() route: string;
  @Prop() name: string;
  @Prop() time: Date;

  getAirlineText(id) {
    return getAirlineName(id)
  }
}
</script>

<style scoped>
.card {
  position: relative;
  width: calc(33.3% - 24px);
  margin: 8px;
  border: solid #35495e;
}

img {
  width: 100%;
}

.time {
  top: 0;
  text-align: left;
}

.card-text {
  position: absolute;
  bottom: 40px;
  color: #fff;
  background: rgba(0,0,0,.6);
  width: 100%;
  max-width: 600px;
  padding: 1em 0;
}

.card-text p {
  margin: 0;
  padding: 0 0.8em;
  text-align: center;
  font-size: 16px;
}
</style>
