import Vue from 'vue'
import Toast from './Toast'

export default {
  info (params) {
    let message
    if (typeof params === 'string') {
      message = params
    }
    const propsData = Object.assign({message}, params)
    const ToastComponent = Vue.extend(Toast)
    return new ToastComponent({
      el: document.createElement('div'),
      propsData
    })
  }
}
