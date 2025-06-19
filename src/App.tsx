import Dashboard from './pages/Dashboard'
import { Profile, Shoe, ValueEntry } from './types/sharedTypes'
import './App.css'

function App() {

  const date1 = new Date("January 17, 2025 03:24:00")
  const date2 = new Date("Febuary 17, 2025 03:24:00")
  const date3 = new Date("June 17, 2025 03:24:00")
  const exampleShoe = new Shoe("Nike", "Jordan 14 Retro", "Ferrari", date3, 300.00, 300.00, "https://stockx.com/air-jordan-14-retro-ferrari-2025")
  const exampleProfile = new Profile([new ValueEntry(500, date1), new ValueEntry(4000, date2), new ValueEntry(7300.99, date3)],[exampleShoe, exampleShoe, exampleShoe])

  return (
    <>
      <Dashboard profile={exampleProfile} totalValue={7300.99} numShoes={17}/>
    </>
  )
}

export default App
