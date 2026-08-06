import type { InjectionKey, Ref } from 'vue'

export const pageReadyKey: InjectionKey<Ref<boolean>> = Symbol('pageReady')
