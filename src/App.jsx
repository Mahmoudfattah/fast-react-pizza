import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/Home'
import Menu,{Loader as menuloader} from './features/menu/Menu'
import Cart from './features/cart/Cart'
import Order,{Loader as orderLoader, action as UpdateOrderAction}  from './features/order/Order'
import CreateOrder ,{action as CreateOrderAction} from './features/order/CreateOrder'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'

import  { Toaster } from 'react-hot-toast';

const router = createHashRouter([
  {
    element:<AppLayout/>,
    errorElement: <Error/>,
    children:[
 {
    path:'/',
    element: <Home/>
  },
  {
    path:'/menu',
    element: <Menu/>,
    loader:menuloader,//this will fetch the data that will display on the Menu page
    errorElement: <Error/>,
  },
  {
    path:'/cart',
    element: <Cart/>
  },
  {
    path:'/order/:orderId',
    element: <Order/>,
    loader:orderLoader,
    errorElement: <Error/>,
    action: UpdateOrderAction

  },              
  {
    path:'/order/new',
    element: <CreateOrder/>,
    action:CreateOrderAction
  }
    ]
  },
 
 
])

export default function App() {
  return (
    <>
     <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
   <RouterProvider router={router}>

   </RouterProvider>
    </>
  )
}
