import React, { Fragment, useState } from 'react'
import "./Search.css";
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData';

const Search = () => {
    const history = useNavigate();
    const [keyword, setKeyword] =useState("");
    
    const searchSubmitHandler=(val)=>{
        val.preventDefault();

        if(keyword.trim()){
            history(`/product/${keyword}`);
        }else{
            history(`/products`);
        }
    }
  return (
    <Fragment>
    <MetaData title="Search A Product -- ECOMMERCE" />
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input 
                type="text" 
                placeholder="Search a Product ..."
                onChange={(e)=>setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    </Fragment>
  )
}

export default Search