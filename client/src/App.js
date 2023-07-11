import GamePage from './pages/GamePage.js';
import StartPage from './pages/StartPage.js';
import MultiSetupPage from './pages/MultiSetupPage.js';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<StartPage></StartPage>}/>
        <Route path='/Play' element={<GamePage></GamePage>}/>
        <Route path="/Setup" element={<MultiSetupPage></MultiSetupPage>}/>
      </Routes>
        
    </Router>
  );
}

export default App;
