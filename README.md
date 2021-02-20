## v-json-edit

### Install

```bash
$ npm install --save v-json-edit
# or
$ yarn add v-json-edit
```

### Usage

```js
import Vue from 'vue'
import vJsonEdit from 'v-json-edit'
Vue.use(vJsonEdit)
```

```html
<!--开启编辑，拖拽，监听改变, 将on-change修改为change防止与系统冲突-->
<v-json-edit v-model="json" edit drag @change="changeHandle"></v-json-edit>
```

```js
export default {
  data () {
    return {
       json: {} // 渲染值
    }
  },
  methods: {
    changeHandle (val) {
      // 改变值
    }
  }
}
```

### API

#### Attributes

参数 | 说明 | 类型 |  默认值 | 可选值
---|---|---|---|---
v-model | 渲染值 | String/Object/Array/Number | - | -
mode | 默认编辑器模式 | string | tree | -
modes | 编辑器模式 | array | ["tree", "code", "form", "text", "view", "preview"] | -
search | 右侧是否展示搜索 | boolean | false | -
lang | 显示语言 | string | en | en, pt-BR, zh-CN, tr, ja, fr-FR
drag | 是否可拖拽 | boolean | false | -
edit | 是否可编辑 | boolean | false | -
expand | 展开所有数据 | boolean | true | -
history | 启用历史记录操作按钮 | boolean | true | -
mainMenuBar | 是否显示主功能栏 | boolean | true | -
navigationBar | 显示树结构上当前位置,适用于: tree/form/view模式 | boolean | false | -

#### Events

事件名称 | 说明 | 回调参数
---|---|---
change | 当值进行改变时触发 | value
on-mode | 当模式切换时触发 | {newMode, oldMode}
on-error | 错误时触发 | error
on-select-text | 当选中数据时触发(仅适用于mode: `code`, 'text') | {start, end, text}
