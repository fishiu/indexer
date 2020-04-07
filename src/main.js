import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Indexer from './Indexer.vue';
import axios from 'axios';

Vue.use(ElementUI);
Vue.prototype.$axios = axios; //全局注册，使用方法为:this.$axios

new Vue({
  el: '#app',
  render: h => h(Indexer)
});