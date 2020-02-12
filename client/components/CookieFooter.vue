<template>
    <footer>
        <client-only>
            <cookie-law
                theme="dark-lime"
                buttonText="受け入れる"
                v-on:accept="$store.commit('acceptCookie')"
            >
                <div slot="message">
                    Nuxt Adminを利用すると、Cookieの使用に同意したことになります。jiyuujin LAB.とそのパートナーは、アナリティクス、カスタマイズ、広告目的も含めて、世界中でサービスを提供しCookieを使用します。
                </div>
            </cookie-law>
        </client-only>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import CookieLaw from 'vue-cookie-law'

export default Vue.extend({
    components: {
        CookieLaw
    }
})
</script>
