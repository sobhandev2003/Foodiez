
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
      <header>
      <Navbar/>
      </header>
    <div className='routes-component-div'>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </div>
    <div className='footer'>
    <Footer/>
    </div>
   
   
    
    </div>
  );
}

export default App;
