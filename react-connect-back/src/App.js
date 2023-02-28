import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login';
import Display from './display';
import Register from './register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/display' element={<Display />} />
      </Routes>
    </Router>
  );
}

export default App;
