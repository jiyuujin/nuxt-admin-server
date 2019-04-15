import { NuxtContext } from 'nuxt';
import Vue from 'vue';
import { firestore } from 'firebase';
import { RouteOption } from './route.types';
import { ActionContext as BaseActionContext } from 'vuex';

declare module 'vue/types/vue' {
  //
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // asyncData?: (ctx: NuxtContext) => Promise<any>;
    // fetch?: (ctx: NuxtContext) => Promise<any>;
  }
}

declare module 'vue-router/types/router' {
  interface VueRouter {
    pushTo<T extends keyof RouteOption>(to: T, option: RouteOption[T]): Promise<void>;
  }
}

declare module 'vuex-type-helper' {
  interface BindOptions {
    maxRefDepth?: number;
  }

  export interface ActionContext<State, Getters, Actions, Mutations> extends BaseActionContext<State, any> {
    bindFirebaseRef: (key: string, ref: firestore.Query, options?: BindOptions) => Promise<void>;
    unbindFirebaseRef: (key: string) => void;
  }
}
