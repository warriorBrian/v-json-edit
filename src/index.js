import VJsonEditor from './Json-editor'

const options = {
  install (Vue) {
    Vue.component('v-json-editor', VJsonEditor)
  }
}

export default options
