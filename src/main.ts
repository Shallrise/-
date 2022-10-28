import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import VideoPlayer from 'vue-video-player/src'
// import 'video.js/dist/video-js.css' 
// import 'vue-video-player/src/custom-theme.css'

const app = createApp(App)
// app.use(VideoPlayer)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
