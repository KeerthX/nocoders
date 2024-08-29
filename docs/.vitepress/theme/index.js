import DefaultTheme from 'vitepress/theme'
import FullWidth from './fullwidth.vue'
import './custom.css'

export default {
    ...DefaultTheme,
    layouts: {
        fullwidth: FullWidth
    }
}