import Dashboard from './pages/Dashboard'
import { Profile, ValueEntry } from './lib/sharedTypes'
import './App.css'

function App() {

  const date1 = new Date("January 17, 2025 03:24:00")
  const date2 = new Date("Febuary 17, 2025 03:24:00")
  const date3 = new Date("June 17, 2025 03:24:00")

  const exampleProfile = new Profile([new ValueEntry(500, date1), new ValueEntry(4000, date2), new ValueEntry(5300.99, date3)], [])

  return (
    <>
      <Dashboard profile={exampleProfile}/>
    </>
  )
}

export default App
