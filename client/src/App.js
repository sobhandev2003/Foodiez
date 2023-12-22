
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';
import About from './component/About';
import Contact from './component/Contact';

function App() {
  return (
    <div className="App">
      <header>
      <Navbar/>
      </header>
    <div className='routes-component-div'>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/about' element={<About/>} />
      <Route exact path='/contact' element={<Contact/>}/>
    </Routes>
    </div>
    <div className='footer'>
    <Footer/>
    </div>
   
   
    
    </div>
  );
}

export default App;
