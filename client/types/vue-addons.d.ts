import Vue from 'vue'
import { Route } from 'vue-router'
import { MetaInfo } from 'vue-meta'
import { ActionContext as BaseActionContext } from 'vuex'
import { firestore } from 'firebase'

import { RouteOption } from './route.types'

type QueryOption = {
  query: Object,
  variables: Object
}

type MutateOption = {
  mutation: Object,
  variables: Object
}

interface Apollo {
  query(
    queryOption: QueryOption
  );
  mutate(
    mutateOption: MutateOption
  );
}

interface ApolloHelpers {
  // onLogin(
  //   token: string,
  //   apolloClient?: ApolloClient<{}>,
  //   tokenExpires?: number
  // ): Promise<void>;
  // onLogout(
  //   apolloClient?: ApolloClient<{}>
  // ): Promise<void>;
  getToken(
    tokenName?: string
  ): string;
}

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: Apollo
    $apolloHelpers: ApolloHelpers
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // asyncData?: (ctx: NuxtContext) => Promise<any>;
    // fetch?: (ctx: NuxtContext) => Promise<any>;
    layout?: string;
    middleware?: string | string[];
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

  export interface ActionContext<
    State,
    Getters,
    Actions,
    Mutations
  > extends BaseActionContext<State, any> {
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
