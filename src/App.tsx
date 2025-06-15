import './App.css'
import Dashboard from './pages/Dashboard'
import { Profile } from './types/sharedTypes'

function App() {

  const emptyProfile = new Profile([],[])

  return (
    <>
      <Dashboard profile={emptyProfile}/>
    </>
  )
}

export default App
