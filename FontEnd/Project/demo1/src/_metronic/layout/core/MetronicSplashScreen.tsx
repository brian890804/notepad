import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'

const MetronicSplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
  undefined
)

const MetronicSplashScreenProvider: FC = ({children}) => {
  const [count, setCount] = useState(0) //eslint-disable-line
  return (
    <MetronicSplashScreenContext.Provider value={setCount}>
      {children}
    </MetronicSplashScreenContext.Provider>
  )
}

const LayoutSplashScreen: FC<{visible?: boolean}> = ({visible = true}) => {
  // Everything are ready - remove splashscreen
  const setCount = useContext(MetronicSplashScreenContext)

  useEffect(() => {
    if (!visible) {
      return
    }

    if (setCount) {
      setCount((prev) => {
        return prev + 1
      })
    }

    return () => {
      if (setCount) {
        setCount((prev) => {
          return prev - 1
        })
      }
    }
  }, [setCount, visible])

  return null
}

export {MetronicSplashScreenProvider, LayoutSplashScreen}
