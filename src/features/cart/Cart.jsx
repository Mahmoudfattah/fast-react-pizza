import { Link, useNavigate } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clear } from './cartSlice';
import toast from 'react-hot-toast';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector(stata=> stata.user.username)
  const cart = useSelector(stata=> stata.cart.cart)
  

  function handleClear(){
    dispatch(clear())
    navigate('/menu')
    toast.success('Add some orders 😋 ')
  }

  if(cart.length === 0) return <EmptyCart/>

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu" >&larr; Back to menu</LinkButton>

      <h2 className='mt-7 font-semibold text-xl'>Your cart, {username}</h2>

      <ul className=' mt-3 divide-y divide-stone-200 border-b border-stone-200'>
        {cart.map(item=> <CartItem item={item} key={item.pizzaId}/>)}
      </ul>

      <div className=' mt-6 space-x-2'>
        <Button to="/order/new" size='primary'>Order pizzas</Button>
        <Button size='secondary' onClick={handleClear}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
