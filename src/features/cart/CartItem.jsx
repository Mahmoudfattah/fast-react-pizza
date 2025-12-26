import {  useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "../../ui/DeleteItem";
import EmptyCart from "./EmptyCart";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";

function CartItem({ item }) {

  const { pizzaId, name, quantity, totalPrice } = item;
 
  const getCart = useSelector(state=>state.cart.cart)
  
   if(getCart.length === 0) return <EmptyCart/>
  //  function handleDelete (){
  //    dispatch(deleteItem(pizzaId))
  //  }

  //this is another solution if we want disabled the button
  //  const stop = quantity === 1
  return (
    <li className="py-3 fl sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0 ">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-3">
        <p className="text-sm font-bold sm:mt-1 ">{formatCurrency(totalPrice)}</p>

       <UpdateItemQuantity id={pizzaId}/>
       <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
