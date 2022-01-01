/*
 * @Author: CookChopper
 * @Date: 2021-12-19 18:31:15
 * @LastEditTime: 2021-12-30 22:36:32
 * @LastEditors: CookChopper
 * @Description: 全局组件注册
 */
import {
  Button,
  Icon,
  Form,
  Field,
  Toast,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  List,
  Cell,
  PullRefresh,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Badge,
  SwipeCell,
  Checkbox,
  CheckboxGroup,
  Card,
  Stepper,
  SubmitBar,
  ContactCard,
  AddressList,
  AddressEdit,
  Popup,
  Dialog,
  ActionSheet
} from 'vant'
import NavBar from './NavBar'
import SimpleHeader from './SimpleHeader'
import GoodsList from './GoodsList'
import ListScroll from './ListScroll'
export default {
  install(Vue) {
    Vue.use(Button)
      .use(Icon)
      .use(Form)
      .use(Field)
      .use(Toast)
      .use(Swipe)
      .use(SwipeItem)
      .use(Tabs)
      .use(Tab)
      .use(List)
      .use(Cell)
      .use(PullRefresh)
      .use(GoodsAction)
      .use(GoodsActionIcon)
      .use(GoodsActionButton)
      .use(Badge)
      .use(SwipeCell)
      .use(Checkbox)
      .use(CheckboxGroup)
      .use(Card)
      .use(Stepper)
      .use(SubmitBar)
      .use(ContactCard)
      .use(AddressList)
      .use(AddressEdit)
      .use(Popup)
      .use(Dialog)
      .use(ActionSheet)
    // Vue.use(Icon)
    Vue.component('NavBar', NavBar)
    Vue.component('SimpleHeader', SimpleHeader)
    Vue.component('GoodsList', GoodsList)
    Vue.component('ListScroll', ListScroll)
  }
}
