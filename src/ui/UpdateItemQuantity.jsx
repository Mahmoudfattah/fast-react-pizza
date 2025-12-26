import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantityItem, getCurrentQuantityById, increaseQuantityItem } from '../features/cart/cartSlice';
import { ShoppingCart } from "lucide-react";

import Button from './Button';
import { Link } from 'react-router-dom';

export default function UpdateItemQuantity({id}) {
    const dispatch = useDispatch();
     const getCurrentQuantity = useSelector(getCurrentQuantityById(id));
    
      function handleIncrease() {
        dispatch(increaseQuantityItem(id));
      }
      function handleDecrease() {
        dispatch(decreaseQuantityItem(id));
      }
  return (
          <>
         

        <div className="flex items-center  gap-2 md:gap-3 ">
                    
                 <Button size="circle" onClick={handleIncrease}>
                    +
                  </Button>
                  <p className="text-xs sm:text-xl font-bold mt-2.5 ">{getCurrentQuantity}</p>
                  <Button size="circle" onClick={handleDecrease}>
                    -
                  </Button>
        </div> 
          </>
   
  )
}
