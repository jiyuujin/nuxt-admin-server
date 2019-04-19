import { NuxtContext } from 'nuxt';
import Vue from 'vue';
import { firestore } from 'firebase';
import { RouteOption } from './route.types';
import { VueApollo } from 'vue-apollo/types/vue-apollo';
import ApolloClient from 'apollo-client';
import { AxiosInstance } from 'axios';
import { MetaInfo } from 'vue-meta';
import { Route } from 'vue-router';
import { ActionContext as BaseActionContext } from 'vuex';

declare module 'vue/types/vue' {
  interface apolloHelpers {
    onLogin<R = any>(
      token: string,
      apolloClient?: ApolloClient<R>,
      tokenExpires?: number
    ): Promise<void>
    onLogout<R = any>(
      apolloClient?: ApolloClient<R>
    ): Promise<void>
    getToken(
      tokenName: string
    ): boolean | string
  }

  interface Vue {
    apolloProvider: VueApollo
    $apolloHelpers: apolloHelpers
    $axios: AxiosInstance
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // asyncData?: (ctx: NuxtContext) => Promise<any>;
    // fetch?: (ctx: NuxtContext) => Promise<any>;
    head?: MetaInfo | (() => MetaInfo)
    key?: string | ((to: Route) => string)
    scrollToTop?: boolean
    watchQuery?: boolean | string[]
  }
}

declare module 'vue-router/types/router' {
  interface VueRouter {
    pushTo<T extends keyof RouteOption>(
      to: T,
      option: RouteOption[T]
    ): Promise<void>;
  }
}

declare module 'vuex-type-helper' {
  interface BindOptions {
    maxRefDepth?: number;
  }

  export interface ActionContext<State, Getters, Actions, Mutations> extends BaseActionContext<State, any> {
    bindFirebaseRef: (
      key: string,
      ref: firestore.Query,
      options?: BindOptions
    ) => Promise<void>;
    unbindFirebaseRef: (
      key: string
    ) => void;
  }
}
