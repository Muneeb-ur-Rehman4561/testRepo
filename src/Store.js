import React from 'react'
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer, productDetailsReducer } from './reducers/productReducers';
import {userReducer} from "./reducers/userReducers"

const reducer = combineReducers({
    products: productReducer,
    productDetails : productDetailsReducer,
    user: userReducer,
});



 let initialState = {};

 const middleware = [thunk];


 const Store = createStore(
    reducer, 
    initialState,   
    composeWithDevTools(applyMiddleware(...middleware))
    );


export default Store;