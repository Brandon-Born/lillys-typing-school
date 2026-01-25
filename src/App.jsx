import React from 'react'
import { Route, Switch } from 'wouter'
import { Splash } from './pages/Splash'
import { Agency } from './pages/Agency'
import { Game } from './pages/Game'
import { Mall } from './pages/Mall'
import { DressingRoom } from './pages/DressingRoom'
import './index.css'

import { AudioProvider } from './hooks/useAudioManager'

function App() {
  return (
    <AudioProvider>
      <Switch>
        <Route path="/" component={Splash} />
        <Route path="/agency" component={Agency} />
        <Route path="/game/:lessonId" component={Game} />
        <Route path="/mall" component={Mall} />
        <Route path="/dressing-room" component={DressingRoom} />

        {/* 404 Fallback */}
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-brand-deep text-white">
            <h1 className="text-4xl font-display">404 - Lost on the Runway?</h1>
          </div>
        </Route>
      </Switch>
    </AudioProvider>
  )
}

export default App
