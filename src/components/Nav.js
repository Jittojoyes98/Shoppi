import React, { useContext } from 'react';
import { Container, Dropdown, Form, Navbar,Nav,FormControl, Button } from 'react-bootstrap';
import {FaShoppingCart} from 'react-icons/fa'
import { shopContext } from '../context/Context'
import '../styles/Cards.css'
import {AiFillDelete} from 'react-icons/ai'
import  {Link}  from "react-router-dom";
import { useLocation } from 'react-router-dom'

export default function Header() {
  const {shopState,dispatch,filterDispatch}=useContext(shopContext)
  const {cart}=shopState
  console.log(cart)
  // const history=useHistory();
  return (
    <Navbar bg='dark' variant='dark'style={{height:80}}>
        <Container>
          <Link to='/'>
            <Navbar.Brand>
                Shoppi
            </Navbar.Brand>
          </Link>
            <Navbar.Text className='m-auto'>
              {
                useLocation().pathname.split('/')[1]==="cart"?
                <></>:
                <Form style={{width:500}}>
                  <FormControl placeholder='Search here'onChange={(e)=>filterDispatch({
                  type:'SEARCH_QUERY',
                  payload:e.target.value,
                })}/>
                </Form>
              }
              
            </Navbar.Text>
            <Nav>
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  <FaShoppingCart color="white" className='mr-2'/>
                  <span style={{fontSize:15}}>{cart.length}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className='dropdown-menu dropdown-menu-right' style={{minWidth:370}}>
                  {
                    cart.length>0 ? <span className='items'>{
                      
                      cart.map((c)=>{
                        return (
                          <>
                            <div className='card-item'>
                              <div className='cart-card'>
                                <img src={c.image} alt='none' />
                              </div>
                              <div className='card-details'>
                                <span>{c.name}</span>
                                <span>${c.price.split('.')[0]}</span>
                              </div>
                              <AiFillDelete className='mt-2' style={{ cursor: "pointer" }} onClick={()=>dispatch({type:'REMOVE_FROM_CART',payload:c})}/>
                      
                            </div>
                          </>
                        )
                      })
                      
                      }
                      <Link to='/cart'>
                        <Button variant='primary' style={{width:"95%",margin:"0 10px"}}>Go to Cart</Button>
                      </Link>
                      </span>:<span>Cart is empty !</span>
                  }
                  
                </Dropdown.Menu>

              </Dropdown>
            </Nav>
        </Container>
        
        

    </Navbar>
  )
}

