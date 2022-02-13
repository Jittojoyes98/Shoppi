import React, { useReducer } from 'react'
import { createContext } from 'react'
import { faker } from '@faker-js/faker';
import Reducer from './Reducer';
import { FilterReducer } from './Reducer';

export const shopContext=createContext();
faker.seed(100);

export default function Context({children}){
    const shop={
        products:[...Array(20)].map(()=>{
            return (
                {
                  id:faker.datatype.uuid(),
                  name:faker.commerce.productName(),
                  price:faker.commerce.price(),
                  image:faker.random.image(),
                  instocks:faker.random.arrayElement([0,3,5,7]),
                  fastdelivery:faker.datatype.boolean(),
                  rating:faker.random.arrayElement([1,2,3,4,5])
                }
            )
        }),
        cart:[],
    }
    const [shopState,dispatch]=useReducer(Reducer,shop);
    const [filterState,filterDispatch]=useReducer(FilterReducer,{
      OutStocks:false,
      fastdelivery:false,
      ratingChange:0,
      clearFilter:false,
      searchQuery:"",
    })
    console.log(filterState)
    return (
      <shopContext.Provider value={{shopState,dispatch,filterState,filterDispatch}}>
        {children}
      </shopContext.Provider>
    );
}
