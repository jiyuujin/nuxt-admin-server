<template>
  <div>
    <j-button ref="modalButton" :text="title" @handleClick="displayModal" />
    <transition mode="out-in">
      <div v-if="showModal === true">
        <div class="modal-mask" @click.self="modalClose">
          <div :style="modalWrapperStyle">
            <div class="modal-container">
              <slot />
              <div class="footer-area">
                <j-button
                  text="キャンセル"
                  style="margin: 0 2px"
                  @handleClick="cancel"
                />
                <j-button
                  v-if="isConfirmed"
                  text="確定"
                  style="margin: 0 2px"
                  @handleClick="confirm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const modalStyle = (
  topPosition: string,
  bottomPosition: string,
  leftPosition: string,
  rightPosition: string,
  width: string,
  height: string
) => {
  const ua = navigator.userAgent
  const isIPad = ua.indexOf('iPad') >= 0

  let baseStyle = {
    position: 'fixed',
    maxWidth: '900px',
    transform: isIPad ? 'translate(-50%, -50%)' : '',
    width: 'calc(100% - 44px)',
    top: isIPad ? '50%' : '',
    left: isIPad ? '50%' : '',
    height: height,
    backgroundColor: '#fff',
    borderRadius: '6px',
    'box-shadow': '0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
  }

  if (topPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      top: topPosition
    })
  }

  if (bottomPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      bottom: bottomPosition
    })
  }

  if (leftPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      left: leftPosition
    })
  }

  if (rightPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      right: rightPosition
    })
  }

  return baseStyle
}

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    isConfirmed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false as boolean,
      modalWrapperStyle: {} as object
    }
  },
  methods: {
    modalClose() {
      this.showModal = false
      this.modalWrapperStyle = {}
    },
    cancel() {
      this.modalClose()
      this.$emit('cancel')
    },
    confirm() {
      this.modalClose()
      this.$emit('confirm')
    },
    displayModal() {
      this.modalWrapperStyle = modalStyle('', '', '', '', '60vw', '')
      this.showModal = true
    }
  }
})
</script>

<style lang="scss" scoped>
.modal-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modal-container {
  z-index: 101;
  background-color: #fff;
  color: #000;
  height: auto;
  min-height: 64px;
  padding-bottom: 64px;
  display: flex;

  .footer-area {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2px;
  }
}
</style>
