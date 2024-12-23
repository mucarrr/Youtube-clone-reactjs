import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Feed from "./pages/feed"
import Detail from "./pages/detail"
import Results from "./pages/results"

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Feed/>}/>
      <Route path='/results' element={<Results/>}/>
      <Route path='/watch' element={<Detail/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App