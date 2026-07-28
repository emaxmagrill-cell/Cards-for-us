import { useCallback, useEffect, useState } from 'react'
import bank from './data/questions.json'
import Home from './components/Home.jsx'
import CardView from './components/CardView.jsx'
import LampToggle from './components/LampToggle.jsx'

const HOME = { screen: 'home' }

// The shared ink filter. Every drawn line on the site runs through this, which
// is what stops the SVGs from looking like an icon pack.
function InkDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <filter id="ink-wobble" x="-14%" y="-14%" width="128%" height="128%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.045"
          numOctaves="2"
          seed="9"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="1.5"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export default function App() {
  const [route, setRoute] = useState(HOME)
  const [light, setLight] = useState(
    () => document.documentElement.dataset.light || 'day',
  )

  // A router would need host-side rewrite rules to survive a refresh. This gives
  // the phone's back gesture and the browser back button correct behaviour with
  // no server config at all, which keeps the site a pile of static files.
  useEffect(() => {
    window.history.replaceState({ route: HOME }, '')
    const onPop = (event) => setRoute(event.state?.route ?? HOME)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = useCallback((next) => {
    window.history.pushState({ route: next }, '')
    setRoute(next)
    window.scrollTo(0, 0)
  }, [])

  const back = useCallback(() => window.history.back(), [])

  const toggleLight = useCallback(() => {
    setLight((current) => {
      const next = current === 'lamp' ? 'day' : 'lamp'
      document.documentElement.dataset.light = next
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', next === 'lamp' ? '#241E19' : '#FBF7F0')
      try {
        localStorage.setItem('light', next)
      } catch {
        // Private browsing. The preference just will not stick; nothing breaks.
      }
      return next
    })
  }, [])

  const category = bank.categories.find((c) => c.id === route.categoryId)
  const screen = route.screen !== 'home' && !category ? 'home' : route.screen

  let content
  let backLabel = null

  if (screen === 'cards') {
    backLabel = 'back to the stacks'
    content = <CardView category={category} onBack={back} />
  } else {
    content = (
      <Home
        categories={bank.categories}
        onPick={(categoryId) => go({ screen: 'cards', categoryId })}
      />
    )
  }

  return (
    <>
      <InkDefs />
      <div className="fibre" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <main className="shell">
        <div className="topbar">
          {backLabel ? (
            <button type="button" className="back" onClick={back}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19.5 12h-14M11 6.5 5.5 12l5.5 5.5" />
              </svg>
              {backLabel}
            </button>
          ) : (
            <span />
          )}
          <LampToggle light={light} onToggle={toggleLight} />
        </div>

        <div key={`${screen}:${route.categoryId ?? ''}`}>
          {content}
        </div>
      </main>
    </>
  )
}
