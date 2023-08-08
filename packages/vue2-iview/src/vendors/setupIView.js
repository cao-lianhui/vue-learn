import Vue from 'vue'
import 'iview/dist/styles/iview.css'
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Message,
  Modal,

  Option,
  Panel,
  Poptip,
  Row,
  Select,
  TabPane,
  Table,
  Tabs,
} from 'view-design'

const comps = [
  Button,
  Card,
  Col,
  Collapse,
  Dropdown,
  Icon,
  Panel,
  Row,
  Col,
  TabPane,
  Table,
  Tabs,
  Modal,
  Poptip,
  Input,
  DatePicker,
  Select,
  Option,
]

function registerComponents({ prefix = 'I' } = {}) {
  comps.forEach((comp) => {
    // 以 <Button></Button> 的形式使用，不推荐；有些组件名会和 HTML 标签冲突，如 <Col></Col>
    Vue.component(comp.name, comp)
    // 以 <IButton></IButton> 或 <i-button></i-button> 的形式使用
    Vue.component(`${prefix}${comp.name}`, comp)
  })
}

export function setupIView(options) {
  registerComponents(options)

  Vue.prototype.$Message = Message
  Vue.prototype.$Modal = Modal
}
