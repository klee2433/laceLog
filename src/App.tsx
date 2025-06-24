import Collection from './pages/Collection'
import Wishlist from './pages/Wishlist'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<Collection />}/>
          <Route path="/collection" element={<Collection />}/>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="*" element={<Collection />}/>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
