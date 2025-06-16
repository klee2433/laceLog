import Dashboard from './pages/Dashboard'
import { Profile, Shoe, ValueEntry } from './types/sharedTypes'
import './App.css'

function App() {

  const date1 = new Date("January 17, 2025 03:24:00")
  const date2 = new Date("Febuary 17, 2025 03:24:00")
  const date3 = new Date("March 17, 2025 03:24:00")
  const exampleShoe = new Shoe("Air Jordan 14", "Red", date1, 300.00, 300.00)
  const exampleProfile = new Profile([new ValueEntry(500, date1), new ValueEntry(4000, date2), new ValueEntry(7300.99, date3)],[exampleShoe, exampleShoe, exampleShoe])

  return (
    <>
      <Dashboard profile={exampleProfile} totalValue={7300.99} numShoes={17}/>
    </>
  )
}

export default App
