import Vue from 'vue'

import router from './router'
import App from './App'

Vue.config.devtools = true
console.log(router)
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App },
})
