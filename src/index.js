import _ from 'lodash'
import router from '@/router'

const app = document.getElementById('app')
const Home = document.createElement('p')
Home.setAttribute('href', router.url)
Home.textContent = 'sss2d22ddxdx'
app.appendChild(Home)

// TODO: 
if (module.hot) {
  module.hot.accept()
}
