
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Footer from './component/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Shope from './pages/Shope';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <header>
      <Navbar/>
      </header>
    <div className='routes-component-div'>
    {/* <ToastContainer/> */}
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/about' element={<About/>} />
      <Route exact path='/contact' element={<Contact/>}/>
      <Route  path='/restaurant/:id' element={<Shope/>}/>
      <Route  path='/cart' element={<Cart/>}/>
      <Route path="*" element={<Home/>} /> 
    </Routes>
    </div>
    <div className='footer'>
    <Footer/>
    </div>
   
   
    
    </div>
  );
}

export default App;
