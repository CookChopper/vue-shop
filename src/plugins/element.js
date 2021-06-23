import Vue from 'vue'
import {
  Form,
  FormItem,
  Input,
  Row,
  Button,
  Message,
  Container,
  Aside,
  Main,
  Header,
  MessageBox,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
