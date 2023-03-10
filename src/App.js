import './App.css';
import React, { Component, useEffect }  from 'react';
import Headers from './component/layout/Header/Header.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import webfont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./Store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import {useSelector} from "react-redux";

function App() {
  const {isAuthenticated,user} = useSelector((state)=>state.user);
  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"],
      }
    })
    store.dispatch(loadUser());
  },[])

return( <BrowserRouter>
    <Headers/>
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes>
        <Route exact path="/"    element={<Home/>}/>
        <Route exact path="/products/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route path="/product/:keyword" element={<Products/>}/> 
        <Route exact path="/Search" element={<Search/>}/>
        <Route exact path="/login" element={<LoginSignUp/>}/>
      
            
    </Routes>
   
    <Footer />

  </BrowserRouter>
)}

export default App;
