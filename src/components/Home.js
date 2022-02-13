
import React, { useContext,useState } from 'react';
import  { shopContext } from '../context/Context';
import Cards from './Cards';
import '../styles/Home.css'
import Filter from './Filter';



export default function Home() {
  const {shopState,filterState,filterDispatch}=useContext(shopContext)
  // const ratingArray=products.rating
  const {products}=shopState
  const {OutStocks,fastdelivery,ratingChange,clearFilter,searchQuery,sort}=filterState
  // console.log(cart);
  // const product=transformProducts(products)
  function tranformProducts(){
    if(sort){
      if(sort==='LowToHigh'){
        products.sort((a,b)=>a.price-b.price)
      }else{
        products.sort((a,b)=>b.price-a.price)
      }
    }
    let newProducts=products
    if(!OutStocks){
      newProducts=newProducts.filter((prod)=>prod.instocks>0)
    }
    if(fastdelivery){
      newProducts=newProducts.filter((prod)=>prod.fastdelivery)
    }
    newProducts=newProducts.filter((prod)=>prod.rating>=ratingChange)
    if(searchQuery.length>0){
      const searchQueryLength=searchQuery.length
      newProducts=newProducts.filter((prod)=>{
        const Name=prod.name.slice(0,searchQueryLength).toLowerCase();
        return(
          Name===searchQuery?true:false
        )
      })
      // console.log(prod.name.slice(0,searchQueryLength));

    }
    return newProducts
  }


  return (
    <div className='banner'>
      <Filter  rating={ratingChange} handleClick={(i)=>filterDispatch({
        type:'SORT_RATING',
        payload:i+1
      })}/>
      <div className='products'>
        {
          tranformProducts().map((prod,id)=>{
            return(
              <Cards prod={prod} key={id}/>
            )
          })
        }
      </div>
    </div>
  )
}
