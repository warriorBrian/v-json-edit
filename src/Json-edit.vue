<template>
  <div>
    <div class="jsonEditor-vue"></div>
  </div>
</template>

<script>
import JsonEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'
export default {
  name: 'Json-edit',
  model: {
    prop: 'json',
    event: 'on-change'
  },
  props: {
    json: {
      type: [String, Object, Array, Number],
      default: ''
    },
    mode: {
      type: String,
      default: 'tree'
    },
    modes: {
      type: Array,
      default () {
        return ['tree', 'code', 'form', 'text', 'view', 'preview']
      }
    },
    search: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: 'en'
    },
    edit: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: true
    },
    history: {
      type: Boolean,
      default: true
    },
    mainMenuBar: {
      type: Boolean,
      default: true
    },
    navigationBar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editor: null,
      expandModes: ['tree', 'view', 'form']
    }
  },
  mounted () {
    this.initJsonEditor()
    this.expandedAll()
  },
  watch: {
    json: {
      handler (val) {
        this.editor.set(val)
        this.expandedAll()
      },
      deep: true
    }
  },
  methods: {
    initJsonEditor () {
      const _self = this
      const el = this.$el.querySelector('.jsonEditor-vue')
      const options = {
        mode: _self.mode,
        modes: _self.modes,
        mainMenuBar: _self.mainMenuBar,
        navigationBar: _self.navigationBar,
        language: _self.lang,
        history: _self.history,
        search: _self.search,
        onChange () {
          try {
            const data = _self.editor.get()
            _self.$emit('change', data)
          } catch (e) {
            _self.$emit('on-error', e)
          }
        },
        onModeChange (newMode, oldMode) {
          _self.$emit('on-mode', { newMode, oldMode })
        },
        onTextSelectionChange (start, end, text) {
          _self.$emit('on-select-text', { start, end, text })
        },
        onEditable ({ path, field, value }) {
          return { field: _self.drag, value: _self.edit }
        },
        onError (error) {
          this.$emit('on-error', error)
        }
      }
      this.editor = new JsonEditor(el, options, this.json)
    },
    expandedAll () {
      const methodsLists = ['expandAll', 'collapseAll']
      // mehods is exists?
      const methodsExist = methodsLists.every(v => v in this.editor)
      const mode = this.editor.getMode()
      // is expand all?
      const isExpand = this.expand && this.expandModes.includes(mode)
      if (methodsExist) {
        isExpand ? this.editor.expandAll() : this.editor.collapseAll()
      }
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>

<style scoped>

</style>
