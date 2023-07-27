import GamePage from './pages/GamePage.js';
import StartPage from './pages/StartPage.js';
import MultiSetupPage from './pages/MultiSetupPage.js';
import MultiGamePage from './pages/MultiGamePage.js';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {useState} from 'react'
function App() {
  const [roomId,setRoomId]=useState(null);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<StartPage></StartPage>}/>
        <Route path='/Play' element={<GamePage></GamePage>}/>
        <Route path="/Setup" element={<MultiSetupPage setRoomId={setRoomId}></MultiSetupPage>}/>
        <Route path="/MultiPlay" element={<MultiGamePage roomId={roomId}></MultiGamePage>}/>
      </Routes>
        
    </Router>
  );
}

export default App;
