
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
import Register from './pages/Register';
import EditCategory from './pages/EditCategory';
import Order from './pages/Order';
import PlaceOrder from './pages/PlaceOrder';




function App() {
  return (
    <div className="App">

      <Navbar />

      <section className='routes-component-section'>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/help' element={<Contact />} />
          <Route exact path='/restaurant/:id' element={<Shope />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/edit-category' element={<EditCategory />} />
          <Route exact path='/place-order' element={<PlaceOrder />} />
          <Route exact path='/my-order' element={<Order />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </section>


      <Footer />





    </div>
  );
}

export default App;
