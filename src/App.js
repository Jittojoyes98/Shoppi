import './App.css';
import Header from './components/Nav';
import {Route,Routes} from 'react-router-dom'
import Cart from './components/Cart';
import Home from './components/Home';
import React from 'react';
// import Context from './context/Context';

function App() {
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path='/cart' element={<Cart/>} exact/>
      </Routes>
      
    </div>
  );
}

export default App;
