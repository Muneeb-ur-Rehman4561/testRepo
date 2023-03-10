import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css";
import {useSelector,useDispatch} from "react-redux";
import {clearErrors, getProductDetails} from "../../actions/productAction";
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../layout/Loader/Loader';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.js"
import {useAlert} from "react-alert";
import MetaData from '../layout/MetaData';


const options= {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 18: 20,
    value: 2.5,
    isHalf: true
}

const ProductDetails = ({match}) => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const alert = useAlert();

    console.log("We are here Bhai");
    const { product, loading, error} = useSelector((state)=>state.productDetails);

    const idd= match? match.params.id : "no value";
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch,id,error,alert])
    
  return (
    <Fragment>
        {!product ? <Loader/> : <Fragment>
        <MetaData title={`${product.name} -- ECOMMERCE`}/>
        <div className='ProductDetails'>
            <div className='abc'>
                  <Carousel height={220} >
                    {
                        product.images.map((item, val)=>(
                        <img className='CarouselImage' key={item.url} src={item.url} alt={`${val} Slide`}>

                            </img>
                        )) 
                    }
                </Carousel> 
            </div>
            <div>
                    <div className='detailsBlock-1'>
                        <h2>{ product.name}</h2>
                        <p>Product# { product._id}</p>
                    </div>

                    <div className='detailsBlock-2'>
                        <ReactStars {...options}/>
                        <span>{ `(${product.numOfReviews} Reviews)`}</span>
                    </div>

                    <div className='detailsBlock-3'>
                        <h1>{product.price}</h1>

                        <div className='detailsBlock-3-1'>
                            <div className='detailsBlock-3-1-1'>
                                <button>-</button> 
                                <input type="number" value="1"/>
                                <button>+</button>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                        <p> Status:
                        <b className={ product.stock < 1 ? "redColor":"greenColor"}>
                            {product.stock < 1 ? "Out of Stock":"InStock"}
                        </b>
                        </p>
                    </div>
                    <div  className='detailsBlock-4'>
                        Description : <p>{`Descriptions: ${product.descriptions}`}</p>
                    </div>
                    <button className='submitReview'>Submit Review</button>
            </div>
        </div>
    
        <h3 className='reviewHanding'>REVIEWS</h3>
        { product.reviews[0] ? (
            <div className='reviews'>
                {product.reviews.map((val)=>(
                    <ReviewCard review={val} />
                ))}
            </div>
        ):(
            <p className='noReviews'>No Reviews Yet</p>
        )}




    </Fragment>
        }
    </Fragment>
  )
}

export default ProductDetails