import { useState } from 'react'
import AppRoutes from './routes'
import SplashScreen from '@/components/SplashScreen/SplashScreen'
import { SplashProvider, useSplash } from '@/context/SplashContext'

// Splash screen sirf pehli baar dikhegi (session mein ek baar)
const SPLASH_SHOWN_KEY = '__splash_shown__'

function hasShownSplash() {
  try {
    return sessionStorage.getItem(SPLASH_SHOWN_KEY) === '1'
  } catch (_) {
    return false
  }
}

function markSplashShown() {
  try {
    sessionStorage.setItem(SPLASH_SHOWN_KEY, '1')
  } catch (_) {}
}

/** Inner component so it can access SplashContext */
function AppInner() {
  const { setPinLaunched } = useSplash()
  const [splashDone, setSplashDone] = useState(hasShownSplash())

  const handlePinLaunched = () => {
    setPinLaunched(true)
  }

  const handleSplashFinish = () => {
    markSplashShown()
    setSplashDone(true)
  }

  return (
    <>
      {!splashDone && (
        <SplashScreen
          onFinish={handleSplashFinish}
          onPinLaunched={handlePinLaunched}
        />
      )}
      {/* Routes hamesha mounted rahenge; splash ke dauran hidden */}
      <div style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <AppRoutes />
      </div>
    </>
  )
}

function App() {
  return (
    <SplashProvider>
      <AppInner />
    </SplashProvider>
  )
}

export default App
