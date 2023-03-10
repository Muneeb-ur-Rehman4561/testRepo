import {ALL_PRODUCT_FAIL,
        ALL_PRODUCT_SUCCESS,
        ALL_PRODUCT_REQUEST,
        PRODUCT_DETAILS_FAIL,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        CLEAR_ERRORS
    } from "../constraints/productConstraints";

    export const productReducer = (state={product:[]}, action)=>{
    switch(action.type){
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product:[]
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product:action.payload.product,
                productsCount: action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
                filteredProductsCount:action.payload.filteredProductsCount
            }
        case ALL_PRODUCT_FAIL:
            console.log(action.payload);
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                }
        default:
            return state;        
    }
}

export const productDetailsReducer = (state= { Aproduct:{} }, action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product:action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            console.log(action.payload);
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null,
                }
        default:
            return state;        
    }
}