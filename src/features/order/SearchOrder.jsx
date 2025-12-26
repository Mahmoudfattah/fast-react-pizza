import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchOrder() {
    const [qeary,setQeary] = useState('') 
    const navigate = useNavigate()

    function handleSubmit(e){
      e.preventDefault()
      if(!qeary) return;
      navigate(`/order/${qeary}`)
      setQeary('')
    }
  return (
     <form onSubmit={handleSubmit}>

    <input placeholder='Search order #' value={qeary}
    onChange={e=> setQeary(e.target.value)}
    className='rounded-full text-sm bg-yellow-100 px-4 py-3 w-28 sm:w-64 placeholder:text-stone-400 sm:focus:w-72 transition-all duration-300 
     font-semibold tracking-wide text-stone-800 uppercase    focus:ring focus:ring-yellow-300 focus:ring-opicity-50 focus:outline-none '
    ></input>
    </form>
  )
}
