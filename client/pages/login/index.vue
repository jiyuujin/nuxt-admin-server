<template>
  <main-template :user-status="userStatus">
    <div class="login">
      <div class="login--title-left">
        最新のお知らせ
      </div>
      <div class="login--sec">
        <div class="login--row-card-inner-description">
          現在はありません
        </div>
      </div>

      <div class="login--sec">
        <div class="login--row-card-inner-description">
          <slide-show />
        </div>
      </div>

      <card
        title="Web猫ブログ"
        :icon="icon"
        :tags="['Nuxt', 'Vue', 'Contentful', 'Fargate']"
        price="¥0"
        tooltip="1店舗ごとに料金がかかります"
        :handle-submit-click-callback="linkToBlogSite"
        promotion="絶賛「登壇駆動開発」中です！"
        :rate="3.4"
        description="2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。"
      />

      <card
        title="Web Developer - Yuma Kitamura"
        :icon="icon"
        :tags="['Gatsby', 'React']"
        price="¥0"
        tooltip="1店舗ごとに料金がかかります"
        :handle-submit-click-callback="linkToProfileSite"
        promotion="絶賛「登壇駆動開発」中です！"
        :rate="4.3"
        description="Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。"
      />

      <card
        title="Admin"
        :icon="icon"
        :tags="['Nuxt', 'Vue', 'Firestore', 'Netlify']"
        price="¥0"
        tooltip="1店舗ごとに料金がかかります"
        :handle-submit-click-callback="linkToAdminSite"
        promotion="Decorator APIからCompotion APIに切り替えました！"
        :rate="1.4"
        description="Web猫ブログを始め、自身の経歴に深く寄与する管理画面を設計・開発しています。"
      />

      <card
        title="鋭意開発中 (仮)"
        :icon="icon"
        :tags="['Next', 'React', 'AppSync', 'Amplify']"
        price="要相談"
        tooltip="1店舗ごとに料金がかかります"
        :handle-submit-click-callback="linkToWhiteSite"
        promotion="これまでの経歴を楽々登録！！"
        :rate="2.8"
        description="求人に深く寄与する管理画面を設計・開発しています。"
      />

      <div class="login--title-left">
        レビュー
      </div>
      <div class="login--sec">
        <div
          class="login--sec-right"
          style="padding: 4px; border-bottom: 1px #eee solid;"
        >
          <j-button
            text="レビューを書く"
            :danger="Boolean(true)"
            @handleClick="review"
          />
        </div>
        <div class="login--row-card-inner-description">
          現在はありません
        </div>
      </div>

      <div class="login--row">
        <div class="login--row-card">
          <div class="login--row-card-title">
            このアプリの情報
          </div>
          <div class="login--row-card-inner">
            <div class="login--row-card-inner-description">
              <div class="subtitle">
                サポートサイト
              </div>
              <p>
                <a href="https://yuukit.me/">https://yuukit.me/</a>
              </p>
              <div class="subtitle">
                プライバシーポリシー
              </div>
              <p>
                <a href="https://webneko.dev/contact">
                  https://webneko.dev/contact
                </a>
              </p>
              <div class="subtitle">
                開発元
              </div>
              <p>nekohack inc.</p>
              <div class="subtitle">
                公開日
              </div>
              <p>2020/04/02</p>
            </div>
          </div>
        </div>
        <div class="login--row-card">
          <div class="login--row-card-title">
            ログイン
          </div>
          <div class="login--row-card-inner">
            <div class="login--row-card-inner-description">
              <div style="margin: 20px;">
                <j-input
                  placeholder="メールアドレス"
                  :text="state.email"
                  @handleInput="applyEmail"
                />
              </div>
              <div style="margin: 20px;">
                <j-input
                  placeholder="パスワード"
                  input-type="password"
                  :text="state.password"
                  password
                  @handleInput="applyPassword"
                />
              </div>
              <div style="margin: 20px;">
                <j-button text="ログイン" @handleClick="login" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="login--title-left">
        アップデート
      </div>
      <div class="login--sec">
        <div class="login--row-card-inner-description">
          現在はありません
        </div>
      </div>

      <div class="login--title-right">
        <j-button text="問題を報告" danger @handleClick="report" />
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import {
  createComponent,
  SetupContext,
  reactive,
  computed
} from '@vue/composition-api'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const Card = () => import('@/components/lp/Card.vue')
const SlideShow = () => import('@/components/lp/SlideShow.vue')

export default createComponent({
  components: {
    MainTemplate,
    Card,
    SlideShow
  },
  setup(props: {}, ctx: SetupContext) {
    const icon = require('../../static/bakeneko.png')
    const state = reactive({
      email: '',
      password: '',
      isForm: true
    })

    const userStatus = computed(() => ctx.root.$store.state.product.userStatus)

    return {
      icon,
      state,
      userStatus,
      linkToBlogSite() {
        location.href = 'https://webneko.dev/'
      },
      linkToProfileSite() {
        location.href = 'https://yuukit.me//'
      },
      linkToAdminSite() {
        location.href = 'https://nuxtadmin.netlify.com/'
      },
      linkToWhiteSite() {
        //
      },
      review() {
        //
      },
      report() {
        //
      },
      applyEmail(value) {
        state.email = value
      },
      applyPassword(value) {
        state.password = value
      },
      async login() {
        await ctx.root.$store.dispatch('product/signIn', {
          email: state.email,
          password: state.password
        })

        if (ctx.root.$store.state.product.userStatus) {
          await ctx.root.$router.push('/')
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  color: #000;

  &--title {
    &-left {
      margin: 0 48px 0;
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }

    &-right {
      margin: 0 48px 0;
      font-size: 14px;
      font-weight: bold;
      text-align: right;
    }
  }

  &--sec {
    padding: 10px;
    margin: 0 48px 16px;
    border: 1px #eee solid;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);

    &-header {
      display: flex;
      align-items: flex-start;
      font-size: 16px;
      margin-bottom: 12px;
    }

    &-left {
      display: flex;
      justify-content: flex-start;
      font-size: 16px;
      margin-bottom: 12px;
    }

    &-right {
      display: flex;
      justify-content: flex-end;
      font-size: 16px;
      margin-bottom: 12px;
    }

    &-list {
      padding-left: 0;
      list-style-type: none;
    }
  }

  &--row {
    display: flex;
    flex-flow: wrap;
    max-width: 100%;
    margin: 12px 48px;

    &-card {
      flex: 0 0 calc(50% - 10px);
      display: block;
      max-width: 50%;

      &-title {
        font-size: 14px;
        font-weight: bold;
      }

      &-inner {
        padding: 10px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        border: 1px #eee solid;
        border-radius: 4px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
        height: 180px;

        &-header {
          display: flex;
          align-items: flex-start;
          font-size: 16px;
          margin-bottom: 12px;
        }

        &-description {
          font-size: 12px;
          position: relative;
          text-align: left;

          .subtitle {
            font-size: 12px;
            color: #404040;
          }

          p {
            font-size: 12px;
            color: #404040;
            margin: 0 0 8px;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
        }
      }

      &:nth-child(odd) {
        margin-right: 10px;
      }

      &:nth-child(even) {
        margin-left: 10px;
      }
    }
  }
}

@media screen and (min-width: 481px) {
  .login {
    &-row {
      &-card {
        width: 100%;
      }
    }
  }
}

@media (prefers-color-scheme: dark) {
  .login {
    color: #fff;

    &--row {
      &-card {
        &-inner {
          &-description {
            .subtitle {
              color: #fff;
            }

            p {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
