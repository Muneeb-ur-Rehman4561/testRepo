import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./Home.css"
import Product from "./ProductCard";
import MetaData from "../layout/MetaData"
import {clearErrors, getProduct} from "./../../actions/productAction"
import {useSelector, useDispatch} from "react-redux";

import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";


const Home = () => {
  const alert = useAlert(); 
  const dispatch = useDispatch();
  const {loading, error, product, productsCount} = useSelector((state)=>state.products);
  
  useEffect(() => {

    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct())
  
  }, [dispatch,alert]);
  
  
  return (
    <Fragment>
      {loading ? <Loader/> : <Fragment>
  <MetaData title="ECOMMERCE" />
    <div className='banner'> 
        <h1>Welcome to Ecommerce</h1>
        <p>Find Amazing Products Below</p>
        <a href="#container">
            <button>
                Scroll <CgMouse/> 
            </button>
        </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>

    <div className="container" >

    {product && product.map((value)=>(
      <Product product={value}/>
    ))}
        
    </div>

  </Fragment>}

    </Fragment>
  )
}

export default Home