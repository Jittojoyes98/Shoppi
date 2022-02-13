import React, { useContext } from 'react'
import { Button ,Card} from 'react-bootstrap'
import '../styles/Cards.css'
import {AiFillStar,AiOutlineStar} from'react-icons/ai'
import { shopContext } from '../context/Context'

export default function Cards({prod}) {
  const fastdelivery=prod.fastdelivery
  const rating=prod.rating
  const {shopState,dispatch}=useContext(shopContext)
  const {cart}=shopState

  return (
    <Card className='cards'>
          <Card.Img src={prod.image} alt='none' variant='top'/>
          <div className='data'>
            <p className='mb-1'>{prod.name}</p>
            <p className='mb-1'>${prod.price.split('.')[0]}</p>
            <p className='mb-1'>{fastdelivery?'fastDelivery':'4 days delivery'}</p>
            <span className='d-block mb-1'>{
              
              [...Array(5)].map((val,id)=>{
                    return(
                        < >
                        {(rating>id )? <AiFillStar className='mt-1' cursor='pointer' key={id} />:<AiOutlineStar className='mt-1'  cursor='pointer' key={id}/>}
                        </>
                    )
              })
              
              }
            </span>
            <>
            {
              cart.some((c)=> c.id===prod.id) ? <Button variant="danger" onClick={()=>dispatch({type:'REMOVE_FROM_CART',payload:prod})}>Remove from Cart</Button>:<Button variant='primary' disabled={!prod.instocks} onClick={()=>dispatch({type:'ADD_TO_CART',payload:prod})}>{prod.instocks?'Add to Cart': 'Out of Stock'}</Button>
            }
            </>
            
          </div>
    </Card>
  )
}
