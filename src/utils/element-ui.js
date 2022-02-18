import Vue from 'vue'
import { Card,  Cascader, Notification, Table, TableColumn } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Card)
Vue.use(Cascader)
Vue.use(TableColumn)
Vue.use(Table)
Vue.prototype.$notify = Notification