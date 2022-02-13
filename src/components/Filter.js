import React, { useContext, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import '../styles/Filter.css'
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'
import {shopContext} from '../context/Context'

export default function Filter({handleClick,rating}) {
    const {filterState,filterDispatch}=useContext(shopContext)
    const {OutStocks,fastdelivery,ratingChange,clearFilter,searchQuery,sort}=filterState
    console.log(filterState)
    return (
        <div className='filter'>
            <Card className='bg-dark text-white p-3 h-100'>
                <h1 className='mb-3'>Filter Products</h1>
                <Form className='d-flex flex-column'>
                    <Form.Check type='radio' id="first" label="Ascending" className='mb-3'onChange={()=>filterDispatch({
                        type:'SORT_PRODUCTS',
                        payload:'LowToHigh'
                    })} checked={sort==='LowToHigh'? true:false}/>
                    <Form.Check type='radio' id="second" label="Descending"className='mb-3'onChange={()=>filterDispatch({
                        type:'SORT_PRODUCTS',
                        payload:'HighToLow'
                    })} checked={sort==='HighToLow'? true:false}/>
                    <Form.Check type='checkbox' id="third" label="Include Out of Stock"className='mb-3'onChange={()=>{
                        filterDispatch({
                            type:'INCLUDE_OUT_OF_STOCK',
                        })
                    }} checked={OutStocks}/>
                    <Form.Check type='checkbox' id="fourth" label="Fast Delivery Only"className='mb-3'onChange={()=>{
                        filterDispatch({
                            type:'FAST_DELIVERY',
                        })
                    }} checked={fastdelivery}/>
                    <div className='d-flex'>
                        <p>Rating:</p>
                        {
                            [...Array(5)].map((val,id)=>{
                                return(
                                    <>
                                    {(ratingChange>id )? <AiFillStar key={id} className='mt-1' onClick={()=>handleClick(id)} cursor='pointer' />:<AiOutlineStar key={id} className='mt-1' onClick={()=>handleClick(id)} cursor='pointer'/>}
                                    </>
                                )
                            })
                        }
                    </div>
                    <Button variant="light" onClick={()=>filterDispatch({
                        type:'CLEAR_FILTER'
                    })}>Clear filters</Button>
                </Form>
            </Card>
        </div>
    )
}
