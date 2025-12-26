// import React, { useEffect } from 'react'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './loader'
// import { useSelector } from 'react-redux'

export default function AppLayout() {

  
  
  
  const navigation = useNavigation()//this hook help us to know the state if it was idel or loading
  const isLoading = navigation.state=== 'loading'
  
  // const user = useSelector(state=>state.user.username)
  // const navigate = useNavigate()
  //    useEffect( function(){
    //    if(user ==='') navigate('/')
    //  },[user,navigate])
  return (
    <div className='h-screen grid grid-rows-[auto_1fr_auto] '>

    {isLoading && <Loader></Loader>}
        <Header/>
        <div className="">
        <main className='mx-auto max-w-3xl  '>
           <Outlet></Outlet>
        </main>
        </div>

        <CartOverview/>
    </div>
  )
}
