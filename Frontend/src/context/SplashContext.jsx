import { createContext, useContext, useState } from 'react'

/**
 * SplashContext — splash screen se homepage tak animation coordinate karta hai.
 *
 * pinLaunched: true hone par navbar ka location icon bounce-in animation chalata hai,
 * jaise Swiggy mein pin fly karke navbar mein land karta hai.
 */
const SplashContext = createContext({
  pinLaunched: false,
  setPinLaunched: () => {},
})

export function SplashProvider({ children }) {
  const [pinLaunched, setPinLaunched] = useState(false)

  return (
    <SplashContext.Provider value={{ pinLaunched, setPinLaunched }}>
      {children}
    </SplashContext.Provider>
  )
}

export function useSplash() {
  return useContext(SplashContext)
}
