<template>
  <div class="p-4 mb-2 mx-8 rounded-2xl shadow-card">
    <div class="flex justify-between item-center mb-8">
      <div class="flex flex-start item-center">
        <img :src="icon" :alt="title" class="w-24 h-24" />
        <div class="ml-4 text-left">
          <div class="text-xl">
            {{ title }}
          </div>
          <span v-for="tag in tags" :key="tag" class="text-sm">
            <span class="p-2 mx-2 bg-gray-600 text-white rounded-2xl">
              {{ tag }}
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="font-medium text-gray-700">
      {{ promotion }}
    </div>
    <div class="text-gray-700">
      {{ rate }}
      <span :class="`rate rate${replace(rate)}`" />
    </div>
    <div class="text-gray-500">
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
@import '@/assets/rate.scss';
</style>
