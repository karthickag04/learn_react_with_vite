import { useState } from 'react'
import './App.css'
import BasicEffect from './BasicEffect'
import MountOnlyEffect from './MountOnlyEffect'
import DependencyEffect from './DependencyEffect'
import MultiDependencyEffect from './MultiDependencyEffect'
import TimerCleanup from './TimerCleanup'
import WindowResize from './WindowResize'
import MouseTracker from './MouseTracker'
import FetchAbort from './FetchAbort'
import CleanupOrder from './CleanupOrder'
import DataFetching from './DataFetching'
import LocalStorageSync from './LocalStorageSync'
import DebouncedSearch from './DebouncedSearch'
import PreviousValue from './PreviousValue'
import KeyboardShortcuts from './KeyboardShortcuts'
import OnlineStatus from './OnlineStatus'

function App() {
  const [view, setView] = useState('all')

  return (
    <div style={{ padding: '20px' }}>
      <h1>React useEffect Topics</h1>
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setView('all')}>Show All</button>
        <button onClick={() => setView('basics')}>Basics</button>
        <button onClick={() => setView('cleanup')}>Cleanup</button>
        <button onClick={() => setView('patterns')}>Patterns</button>
      </nav>

      <hr />

      {(view === 'all' || view === 'basics') && (
        <section>
          <h2>1. Basics</h2>
          <BasicEffect />
          <MountOnlyEffect />
          <DependencyEffect />
          <MultiDependencyEffect />
        </section>
      )}

      {(view === 'all' || view === 'cleanup') && (
        <section>
          <h2>2. Cleanup</h2>
          <TimerCleanup />
          <WindowResize />
          <MouseTracker />
          <FetchAbort />
          <CleanupOrder />
        </section>
      )}

      {(view === 'all' || view === 'patterns') && (
        <section>
          <h2>3. Patterns</h2>
          <DataFetching />
          <LocalStorageSync />
          <DebouncedSearch />
          <PreviousValue />
          <KeyboardShortcuts />
          <OnlineStatus />
        </section>
      )}
    </div>
  )
}

export default App
