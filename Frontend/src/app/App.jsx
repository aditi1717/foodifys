import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
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

/** Inner component so it can access SplashContext and Router Hooks */
function AppInner() {
  const { setPinLaunched } = useSplash()
  const location = useLocation()

  // User module paths logic: Splash sirf user app (main app) mein dikhega.
  // Admin, Restaurant aur Delivery module mein skip karenge.
  const isUserModule = useMemo(() => {
    const path = location.pathname.toLowerCase()
    
    // Paths to exclude from splash
    const excludePatterns = [
      '/admin',
      '/food/admin',
      '/food/restaurant',
      '/food/delivery'
    ]
    
    // Check if current path starts with any exclude pattern
    const shouldExclude = excludePatterns.some(pattern => path.startsWith(pattern))
    
    return !shouldExclude
  }, [location.pathname])

  // Agar user module nahi hai, toh splash hamesha "done" maana jayega
  const initialSplashState = !isUserModule || hasShownSplash()
  const [splashDone, setSplashDone] = useState(initialSplashState)

  const handlePinLaunched = () => {
    setPinLaunched(true)
  }

  const handleSplashFinish = () => {
    markSplashShown()
    setSplashDone(true)
  }

  // Effect to handle direct navigation while splash is pending
  // (e.g. user manually types /admin after landing on /)
  if (!splashDone && !isUserModule) {
    setSplashDone(true)
  }

  return (
    <>
      {!splashDone && isUserModule && (
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
