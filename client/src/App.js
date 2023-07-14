import GamePage from './pages/GamePage.js';
import StartPage from './pages/StartPage.js';
import MultiSetupPage from './pages/MultiSetupPage.js';
import MultiGamePage from './pages/MultiGamePage.js';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import socket from './socket'
function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<StartPage></StartPage>}/>
        <Route path='/Play' element={<GamePage></GamePage>}/>
        <Route path="/Setup" element={<MultiSetupPage></MultiSetupPage>}/>
        <Route path="/MultiPlay" element={<MultiGamePage></MultiGamePage>}/>
      </Routes>
        
    </Router>
  );
}

export default App;
