import { createApp } from 'vue'
import { inject as injectAnalytics } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import '@fontsource/anton'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-mono/600.css'
import './style.css'
import App from './App.vue'

injectAnalytics()
injectSpeedInsights()

createApp(App).mount('#app')
