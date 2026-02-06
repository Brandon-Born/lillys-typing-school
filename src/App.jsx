import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'wouter'
import './index.css'

import { AudioProvider } from './hooks/useAudioManager'

const Splash = lazy(() => import('./pages/Splash').then((m) => ({ default: m.Splash })))
const Agency = lazy(() => import('./pages/Agency').then((m) => ({ default: m.Agency })))
const Game = lazy(() => import('./pages/Game').then((m) => ({ default: m.Game })))
const Mall = lazy(() => import('./pages/Mall').then((m) => ({ default: m.Mall })))
const DressingRoom = lazy(() => import('./pages/DressingRoom').then((m) => ({ default: m.DressingRoom })))
const NailSalon = lazy(() => import('./pages/NailSalon').then((m) => ({ default: m.NailSalon })))

function App() {
  return (
    <AudioProvider>
      <Suspense fallback={<div className="min-h-screen bg-brand-light" />}>
        <Switch>
          <Route path="/" component={Splash} />
          <Route path="/agency" component={Agency} />
          <Route path="/game/:lessonId" component={Game} />
          <Route path="/mall" component={Mall} />
          <Route path="/dressing-room" component={DressingRoom} />
          <Route path="/nail-salon" component={NailSalon} />

          {/* 404 Fallback */}
          <Route>
            <div className="min-h-screen flex items-center justify-center bg-brand-deep text-white">
              <h1 className="text-4xl font-display">404 - Lost on the Runway?</h1>
            </div>
          </Route>
        </Switch>
      </Suspense>
    </AudioProvider>
  )
}

export default App
