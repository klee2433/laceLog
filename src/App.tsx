import Collection from './pages/Collection'
import Wishlist from './pages/Wishlist'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Collection />}/>
          <Route path="/collection" element={<Collection />}/>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="*" element={<Collection />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
