import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateCrew from './pages/CreateCrew';
import ShowCrew from './pages/ShowCrew';
import CrewDetail from './pages/CrewDetail';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createCrew" element={<CreateCrew />} />
          <Route path="/showCrew" element={<ShowCrew />} />
          <Route path="/crew/:id" element={<CrewDetail />} />
        </Routes>
      </Router>
      <p>Project Clash</p>
    </>
  )
}

export default App
