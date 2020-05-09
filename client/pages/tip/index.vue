<template>
  <main-template :user-status="userStatus">
    <j-modal
      title="Tipを追加"
      style="margin: 20px 0;"
      :handle-cancel-click-callback="cancel"
      :handle-submit-click-callback="submit"
    >
      <div v-if="state.events" style="width: 100%;">
        <j-form title="タイトル">
          <j-input :text="state.form.title" @handleInput="applyTitle" />
        </j-form>
        <j-form title="URL">
          <j-input :text="state.form.url" @handleInput="applyUrl" />
        </j-form>
        <j-form title="詳細">
          <j-input
            :text="state.form.description"
            @handleInput="applyDescription"
          />
        </j-form>
        <j-form title="カテゴリー">
          <j-button
            ref="categoryModalButton"
            text="カテゴリーを選択"
            fill="text"
            @handleClick="displayModal"
          />

          <div v-if="state.showModal === true">
            <div class="modal-mask" @click.self="modalClose">
              <div :style="state.modalWrapperStyle">
                <div class="modal-container">
                  <div class="header">
                    <span class="header-title">
                      カテゴリー選択
                    </span>
                    <span class="header-close-btn" @click="cancel">
                      ×
                    </span>
                  </div>

                  <div class="content">
                    <div class="column">
                      <div
                        style="padding: 0.6rem; color: #000; border-bottom: 1px solid #ddd;"
                      >
                        選択してください
                      </div>
                      <div class="list">
                        <div
                          v-for="(itemClass, index) in state.itemClasses"
                          :key="index"
                          :index="itemClass.itemClassName"
                        >
                          <div
                            v-for="(item, key) in itemClass.itemClassItems"
                            :key="item.itemClassItemName"
                          >
                            <accordion
                              :label-text="
                                key === 0 ? itemClass.itemClassName : ''
                              "
                              :title="item.itemClassItemName"
                              :items="item.items"
                              :selected-ids="state.form.tags"
                              @handleItemClassAll="updateItemClassAll"
                              @handleItemClass="updateItemClass"
                              @handleDeselectItemClassAll="deselectItemClassAll"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="column">
                      <div class="selected-tags-header">
                        <div
                          :class="{ exists: state.form.tags.length > 0 }"
                          class="selected-tags"
                        >
                          選択中のカテゴリー
                          <span class="selected-tags-badge">
                            {{ state.form.tags.length }}
                          </span>
                        </div>
                        <j-button
                          text="全て削除"
                          fill="text"
                          @handleClick="deselectTagAll"
                        />
                      </div>
                      <div class="list">
                        <template v-if="state.form.tags.length === 0">
                          <div class="empty-message-box">
                            <div class="empty-message">
                              カテゴリーを設定してください
                              <div class="description">
                                左パネルから、店舗を選択して下さい
                              </div>
                            </div>
                          </div>
                        </template>
                        <template v-else>
                          <div v-for="tag in selectedTags" :key="tag">
                            {{ tag }}
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <j-button
                      text="キャンセル"
                      fill="text"
                      style="margin-right: 0.8rem;"
                      @handleClick="tagCancel"
                    />
                    <j-button text="確定" @handleClick="tagSubmit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </j-form>
        <j-form title="イベント">
          <j-select
            :options="eventOptions"
            :values="state.form.event"
            @handleSelect="applyEvent"
          />
        </j-form>
      </div>
    </j-modal>

    <photo-upload />

    <template v-if="state.tips">
      <div v-for="item in state.tips.item" :key="item.id">
        <template v-if="item.page === state.activePage">
          <j-form :title="timeFormat(item.data.time)">
            <a :href="item.data.url" target="_blank" rel="noopener">
              {{ item.data.title }}
            </a>
            <div style="margin-bottom: 12px;">
              <template v-for="tag in item.data.tags">
                <j-label :key="tag" :text="tagText(tag)" style="margin: 2px;" />
              </template>
            </div>
          </j-form>
        </template>
      </div>
      <pagination
        :page="state.activePage"
        :max="
          state.tips.item !== undefined
            ? Math.ceil(state.tips.item.length / 20)
            : 1
        "
        @form-data="applyPage"
      />
    </template>
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  reactive,
  computed,
  onMounted
} from '@vue/composition-api'
import { fetchTips, addTip } from '~/services/tipService'
import { fetchEvents } from '~/services/eventService'
import { ItemDataList } from '~/types/database'
import { AccordionItemClass } from '~/types/utils'
import { CATEGORIES } from '~/utils/tip'
import { getTimeFormat } from '~/utils/date'
import { modalStyle, CategoryItems } from '~/utils/tip'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PhotoUpload = () => import('~/components/PhotoUpload.vue')
const Pagination = () => import('~/components/Pagination.vue')
const Accordion = () => import('~/components/TagModal/Accordion.vue')

export default defineComponent({
  middleware: 'auth',
  components: {
    MainTemplate,
    PhotoUpload,
    Pagination,
    Accordion
  },
  setup(props: {}, ctx: SetupContext) {
    const state = reactive({
      activePage: 1 as number,
      modalWrapperStyle: {} as object,
      showModal: false as boolean,
      tips: {} as ItemDataList,
      itemClasses: CategoryItems as AccordionItemClass[],
      events: {} as ItemDataList,
      form: {
        title: '' as string,
        url: '' as string,
        description: '' as string,
        tags: [] as number[],
        tagsInMemory: [] as number[],
        event: 0 as number
      }
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)
    const eventOptions = computed(() => {
      let array: object[] = []
      if (state.events.item !== undefined) {
        state.events.item.forEach((item) => {
          array.push({
            value: item.data.id,
            text: item.data.name
          })
        })
      }
      return array
    })
    const selectedTags = computed(() => {
      let result: any = []
      state.form.tags.map((id: any) => {
        result.push(id)
      })
      return result
    })

    onMounted(async () => {
      Promise.all([
        (state.events = await fetchEvents()),
        (state.tips = await fetchTips())
      ])
    })

    return {
      state,
      userStatus,
      eventOptions,
      selectedTags,
      applyPage(value: number) {
        state.activePage = value
      },
      applyTitle(value: string) {
        state.form.title = value
      },
      applyUrl(value: string) {
        state.form.url = value
      },
      applyDescription(value: string) {
        state.form.description = value
      },
      applyEvent(value: number) {
        state.form.event = value
      },
      applyTags(value: number) {
        let isSame: boolean = false
        state.form.tags.map((tag) => {
          if (tag === value) {
            isSame = true
          }
        })
        if (!isSame) {
          state.form.tags.push(value)
        }
      },
      timeFormat(t) {
        return getTimeFormat(t)
      },
      tagText(tagId: number) {
        let result: string = ''
        CATEGORIES.map((category) => {
          if (category.value === tagId) {
            result = category.text
          }
        })
        return result
      },
      reset() {
        state.form.title = ''
        state.form.url = ''
        state.form.description = ''
        state.form.tags = [0]
        state.form.event = 0
      },
      cancel() {
        // reset()
      },
      async submit() {
        await addTip(state.form)
        // reset()
      },
      tagCancel() {
        state.form.tags = [...state.form.tagsInMemory]
        state.showModal = false
      },
      tagSubmit() {
        state.form.tagsInMemory = [...state.form.tags]
        state.showModal = false
      },
      displayModal() {
        state.modalWrapperStyle = modalStyle('', '', '', '', '', '')
        state.form.tags = [...state.form.tagsInMemory]
        state.showModal = true
      },
      modalClose() {
        state.form.tagsInMemory = [...state.form.tags]
        state.showModal = false
      },
      deselectTagClassAll(ids) {
        state.form.tags = state.form.tags.filter(
          (tagId) => !ids.includes(tagId)
        )
      },
      deselectTagClass(id) {
        state.form.tags = state.form.tags.filter((tagId) => tagId !== id)
      },
      deselectTagAll() {
        state.form.tags = []
      },
      updateItemClassAll(ids: number[]) {
        ids.forEach((id: number) => {
          !state.form.tags.includes(id)
        })
        state.form.tags = ids
          .filter((id) => !state.form.tags.includes(id))
          .concat(state.form.tags)
      },
      updateItemClass(id: number) {
        if (state.form.tags.includes(id)) {
          state.form.tags = state.form.tags.filter(
            (tagId: number) => tagId !== id
          )
          return
        }
        state.form.tags.unshift(id)
      },
      deselectItemClassAll(ids) {
        state.form.tags = state.form.tags.filter(
          (tagId: number) => !ids.includes(tagId)
        )
      }
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
  text-align: center;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    &-title {
      padding: 1rem;
      color: #000;
    }
    &-close-btn {
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .content {
    display: flex;

    .column {
      overflow-y: auto;
      width: 50%;
      &:nth-child(odd) {
        border-right: 1px solid #ccc;
      }

      .selected-tags-header {
        padding: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .selected-tags {
          font-size: 16px;
          font-weight: bold;
          display: flex;
          align-items: center;
          color: #d3d3d3;
          &-badge {
            background-color: #d3d3d3;
            color: #fff;
            padding: 0 0.4rem;
            border-radius: 3px;
            font-size: 14px;
            margin-left: 0.5rem;
          }
          &.exists {
            color: #0084cf;
            .selected-tags-badge {
              background-color: #0784cf;
            }
          }
        }
      }

      .list {
        overflow-y: scroll;
        height: 320px;
        color: #000;
        text-align: left;
        border: none;
        outline: none;
        transition: all 0.2s ease-in;

        .list-searchable {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: strech;
          width: 100%;
          font-weight: bold;
          text-align: left;
          border: none;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease-in;
          border-top: 1px #ddd solid;
          &--store-info {
            padding: 0.7rem;
            padding-left: 3.3rem;
            .store-name {
              margin: 0;
              font-size: 1.1rem;
              font-weight: normal;
            }
          }
        }
        .empty-message-box {
          padding-bottom: 56px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999999;
          .empty-message {
            font-size: 18px;
            font-weight: bold;
            .description {
              margin-top: 0.6rem;
              font-weight: normal;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0.8rem;
    width: 100%;
    border-top: 1px solid #ccc;
  }
}

.selected-tags {
  .selected-tags-list {
    padding-left: 0;
    margin-top: 0.5rem;
    margin-bottom: 0;
    list-style-type: none;
    li {
      padding: 0.4rem;
      margin: 0.4rem 0.4rem 0 0;
      display: inline-flex;
      border: 1px solid #ddd;
      font-size: 11px;
      border-radius: 3px;
    }
  }
  .toggle-selected-tags {
    margin-top: -30px;
    padding-top: 15px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 2;
    position: relative;
    text-align: center;
    color: #0084cf;
    cursor: pointer;
    .btn-toggle-selected-tags {
      display: inline-flex;
      padding: 0.5rem;
      border-radius: 3px;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background: #f7f7f7;
      }
      .icon {
        margin-left: 0.5rem;
      }
    }
  }
  &.is-opened {
    .toggle-selected-tags {
      margin-top: 0.5rem;
      padding-top: 0;
      background-color: tansparent;
    }
  }
}
</style>
