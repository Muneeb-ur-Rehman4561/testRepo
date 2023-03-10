import React, { Fragment,useEffect, useState } from 'react'
import "./Products.css";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, getProduct} from "./../../actions/productAction"
import Loader from "./../../component/layout/Loader/Loader";
import {useAlert} from "react-alert";
import ProductCard from "./../Home/ProductCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Typography } from '@mui/material';
import Slider from "@mui/material/Slider";
import MetaData from "./../layout/MetaData"

const categories=[
    "ProductA",
    "Footware",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
]

const Products = () => {

    const [currentPage, setcurrentPage] = useState(1);
    const [price, setPrice] = useState([0,2500])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const setCurrentPageNo = (e)=>{
        setcurrentPage(e);
    }

    const priceHandler=(event, newPrice)=>{
        setPrice(newPrice);
    }
    
    const dispatch = useDispatch();
    const {loading, error, product, productsCount, resultPerPage, filteredProductsCount} = useSelector((state)=>state.products);

    let count = filteredProductsCount;

    const alert = useAlert();

    const val = useParams();
    const keyword = val.keyword;
    
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    }, [dispatch,keyword,currentPage,price,alert,error,category,ratings])
    return (
    <Fragment>
        {loading ? (<Loader/>):(<Fragment>
        <MetaData title="PRODUCTS -- ECOMMERCE" />
        <h2 className='productsHeading'>Products</h2>
        <div className='products'>
            {
                product && product.map((val)=>(
                    <ProductCard key={val._id} product={val} />
                    
                ))
            }
        </div>
        
        <div className='filterBox'>
        <Typography>Price</Typography>
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby='range-slider'
            min={0}
            max={2500}
         />
         <Typography>
            Categories
         </Typography>
         <ul className='categoryBox'>
            {categories.map((category)=>(
            <li className='category-link' key={category} onClick={()=>setCategory(category)}>{category}</li>
            ))}
         </ul>

         <fieldset>
         <Typography component="legend">Ratings Above</Typography>
         <Slider
        size="small"
        value={ratings}
        onChange={(e,newRatings)=>{
            setRatings(newRatings);
        }}
        aria-label="Small"
        valueLabelDisplay="auto"
        min={0}
        max={5}
      />
         </fieldset>
        </div>
            

        
        { resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

        </Fragment>)}
    </Fragment>
  )
}

export default Products