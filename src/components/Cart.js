import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { shopContext } from '../context/Context'
import '../styles/Cart.css'
import {AiFillStar,AiOutlineStar,AiFillDelete} from 'react-icons/ai'

export default function Cart() {
  const {shopState,dispatch}=useContext(shopContext)
  const {cart}=shopState
  const [total,setTotal]=useState(0);
  useEffect(()=>setTotal(cart.reduce((initial,c)=>initial+Number(c.price)*c.qty,0)),[cart])
  // const val=[...Array(2).keys()].map((x)=>x)
  // console.log(val)
  return (
    <div className='cart'>
      <div className='list-item'>
        <ListGroup>
          {
            cart.map((c)=>{
              return(
                <ListGroupItem className='mt-2 ml-2 d-flex justify-content-between'>
                    <img src={c.image} alt='none'className='list-image'/>
                    <span>
                      <p>{c.name}</p>
                    </span>
                    <span>
                      <p>₹{c.price}</p>
                    </span>
                    <span>
                      {
                        [...Array(5)].map((val,id)=>{
                          return(
                            <>
                            {(c.rating>id )? <AiFillStar className='mt-1' cursor='pointer' key={id} />:<AiOutlineStar className='mt-1'  cursor='pointer' key={id}/>}
                            </>
                          )
                        })
                      }                      
                    </span>
                    <span>
                      <Form.Group>
                        <Form.Control as="select" value={c.qty} onChange={(e)=>dispatch({
                          type:'QUANTITY_ADDED',
                          payload:{
                            product:c,
                            qty:e.target.value
                          }
                        })}>
                          {
                            [...Array(c.instocks).keys()].map((x)=>
                              <option key={x+1}>{x+1}</option>
                            )
                          }
                        </Form.Control>
                      </Form.Group>
                    </span>
                    <span>
                      <Button onClick={()=>dispatch({type:'REMOVE_FROM_CART',payload:c})} variant='light' type='button'>
                        <AiFillDelete fontSize='25px'/>
                      </Button>
                    
                      
                    </span>
                </ListGroupItem>
              )
            })
          }
        </ListGroup>

      </div>
      <div className='total'>
        <Card className='bg-dark text-white h-100'>
          <h1 className='mt-3 ml-2'>Subtotal ({cart.length}) items</h1>
          <h5 className='font-weight-bold mt-3 ml-2 mb-5'>Total: ₹ {total}</h5>
          <Button style={{width:"95%",margin:"0px 10px"}}>Proceed to checkout</Button>
        </Card>
        
      </div>
    </div>
  )
}
