
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';
import About from './component/About';
import Contact from './component/Contact';
import Shope from './component/Shope';
import Cart from './component/Cart';

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
      <Route  path='/shope/:id' element={<Shope/>}/>
      <Route  path='/cart' element={<Cart/>}/>
      
    </Routes>
    </div>
    <div className='footer'>
    <Footer/>
    </div>
   
   
    
    </div>
  );
}

export default App;
