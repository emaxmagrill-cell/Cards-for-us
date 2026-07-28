import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are bundled, not fetched from Google. The site makes no network requests
// to anyone once it has loaded, which is the point of a private gift.
import './styles/fonts.css'
import '@fontsource/alegreya-sans/latin-400.css'
import '@fontsource/alegreya-sans/latin-500.css'
import '@fontsource/alegreya-sans/latin-700.css'
import '@fontsource/kalam/latin-400.css'
import '@fontsource/kalam/latin-700.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/pieces.css'
import './styles/screens.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
