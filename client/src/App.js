
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Footer from './component/Footer';
import Contact from './pages/Contact';
import Shope from './pages/Shope';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';




function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <div className='routes-component-div'>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/help' element={<Contact />} />
          <Route path='/restaurant/:id' element={<Shope />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-category' element={<AddCategory />} />
          <Route path='/edit-category' element={<EditCategory/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <div className='footer'>
        <Footer />
      </div>



    </div>
  );
}

export default App;
