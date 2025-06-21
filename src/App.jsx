import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {MovieProvider} from './assets/contexts/MovieContext.jsx'

import Home from './pages/Home.jsx'
import Favorites from './pages/Favorties.jsx'
import { Route, Routes } from 'react-router-dom'
import NavBar from './assets/components/NavBar.jsx'

function App() {


  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>

  );
}

export default App