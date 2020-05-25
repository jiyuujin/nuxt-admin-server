<template>
  <div
    class="p-4 mb-4 border-solid border rounded-lg shadow-md border-gray-200"
  >
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
      <div class="right">
        <div class="price" style="margin: 0 4px;">
          {{ `${price}/年間` }}
        </div>
        <j-tooltip :title="tooltip" style="margin: 0 4px;" />
        <j-button
          text="リポジトリへ進む"
          :disabled="disabled"
          style="margin: 0 8px;"
          @handleClick="link(url)"
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
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },
    icon: {
      type: String as PropType<string>,
      default: ''
    },
    tags: {
      type: Array,
      default: function() {
        return []
      }
    },
    price: {
      type: String as PropType<string>,
      default: ''
    },
    tooltip: {
      type: String as PropType<string>,
      default: ''
    },
    url: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    promotion: {
      type: String as PropType<string>,
      default: ''
    },
    rate: {
      type: Number as PropType<number>,
      default: 1
    },
    description: {
      type: String as PropType<string>,
      default: ''
    }
  },
  methods: {
    replace(number: number): string {
      return String(number).replace('.', '-')
    },
    link(url: string) {
      if (url) {
        location.href = url
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/rate.scss';

.card {
  padding: 16px;
  margin: 12px 48px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    text-align: center;

    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 48px;
        height: 48px;
      }

      .icon {
        margin-left: 12px;
        text-align: left;

        &-title {
          font-size: 14px;
          font-weight: bold;
        }

        &-description {
          font-size: 10px;

          .tag {
            padding: 2px;
            margin: 0 4px;
            background-color: #777;
            color: #fefefe;
          }
        }
      }
    }

    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 16px;
    }
  }

  &-promotion {
    font-size: 12px;
    font-weight: bold;
    color: #404040;
    text-align: left;
  }

  &-rate {
    font-size: 12px;
    font-weight: bold;
    color: #404040;
    text-align: left;
  }

  &-description {
    font-size: 12px;
    color: #aaa;
    text-align: left;
  }
}

@media (prefers-color-scheme: dark) {
  .card {
    background-color: #303030;
    color: #fff;

    &-promotion {
      color: #efefef;
    }

    &-rate {
      color: #efefef;
    }
  }
}
</style>
