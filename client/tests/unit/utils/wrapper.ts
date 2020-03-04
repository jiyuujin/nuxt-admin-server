import Vue from 'vue'
import {
  VueClass,
  mount,
  createLocalVue,
  MountOptions,
  Wrapper
} from '@vue/test-utils'

/**
 * 指定のVueコンポーネントをラップする
 * @param VueComponent Vueコンポーネント
 * @param options オプション
 * @constructor
 */
export const wrapVueComponent = (
  VueComponent: VueClass<Vue>,
  options: Object
): Wrapper<Vue> => {
  // プラグインを使ってテストを書ける
  const localVue: typeof Vue = createLocalVue()

  // 子コンポーネントの影響を受けずにテストを書ける
  return mount(
    VueComponent,
    Object.assign(localVue, options) as MountOptions<Vue>
  ) as Wrapper<Vue>
}
