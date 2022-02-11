import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import AuthInit from './modules/auth/redux/AuthInit'
import { Routes } from './routing/Routes'
import Cutscenes from '../_metronic/layout/core/Cutscenes'
import "../_metronic/layout/core/Cutscenes.css"
type Props = {
  basename: string
}
const App: React.FC<Props> = ({ basename }) => {
  const [BGControl, setBGContorl] = useState(true);
  useEffect(() => {
    setTimeout(() => setBGContorl(false), 5000)
  }, [])
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              {
                BGControl ? <Cutscenes /> : <Routes />
              }
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export { App }
