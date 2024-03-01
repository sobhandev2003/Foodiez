
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import OrderDetails from './pages/OrderDetails';
import Error from './component/Error';

import Protected from './component/Protected';




function App() {
  const navigate=useNavigate();
  const isLogin = useSelector(state => state.Login.isLogin);
  useEffect(() => {
    if (isLogin) {
     navigate("/")
    }
  }, [isLogin,navigate]);
  // console.log(".en",process.env.REACT_APP_BASE_URL);
  return (
    <div className="App">

      <Navbar />

      <section className='routes-component-section'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/help' element={<Contact />} />
          <Route exact path='/restaurant/:id' element={<Protected path={"/restaurant/:id"} component={<Shope />} />} />
          <Route exact path='/cart' element={<Protected path={"/cart"} component={<Cart />} />} />
          <Route exact path='/edit-category' element={<Protected path={"/edit-category"} component={<EditCategory/>} />} />
          <Route exact path='/place-order' element={<Protected path={"/place-order"} component={<PlaceOrder />} />} />
          <Route exact path='/order' element={<Order />} />
          <Route exact path="/order_details" element={<OrderDetails />} />
          <Route path="*" element={<Error navigateTo={"Go to Home"} navigatePath={"/"} />} />
        </Routes>
      </section>


      <Footer />





    </div>
  );
}

export default App;
