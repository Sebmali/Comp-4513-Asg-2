import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GalleryView from './components/GalleyView/GalleryView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full min-h-screen ">
      <GalleryView />
    </div>
  )
}

export default App
