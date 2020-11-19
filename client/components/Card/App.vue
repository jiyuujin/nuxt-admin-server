<template>
  <div class="card">
    <div class="card-content">
      <div class="left">
        <img :src="icon" :alt="title" />
        <div class="icon">
          <div class="icon-title">
            {{ title }}
          </div>
          <span v-for="tag in tags" :key="tag" class="icon-description">
            <span class="tag">{{ tag }}</span>
          </span>
        </div>
      </div>
      <div v-if="purchased" class="right">
        <div class="price" style="margin: 0 4px">
          {{ `${price}/年間` }}
        </div>
        <j-tooltip :title="tooltip" style="margin: 0 4px" />
        <j-button
          text="購入へ進む"
          style="margin: 0 4px"
          @handleClick="handleSubmitClickCallback"
        />
      </div>
    </div>
    <div class="card-promotion">
      {{ promotion }}
    </div>
    <div class="card-rate">
      {{ rate }}
      <span :class="`rate rate${replace(rate)}`" />
    </div>
    <div class="card-description">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

type AppCardProps = {
  title: string
  icon: string
  tags: object[]
  purchased: boolean
  price: string
  tooltip: string
  handleSubmitClickCallback: Function
  promotion: string
  rate: string
  description: string
}

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: function () {
        return []
      }
    },
    purchased: {
      type: Boolean,
      default: false
    },
    price: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    handleSubmitClickCallback: {
      type: Function,
      required: true
    },
    promotion: {
      type: String,
      default: ''
    },
    rate: {
      type: Number,
      default: 1
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup(props: AppCardProps, ctx: SetupContext) {
    const replace = (number: number): string => {
      return String(number).replace('.', '-')
    }
    return { replace }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/card.scss';
@import '@/assets/rate.scss';
</style>
