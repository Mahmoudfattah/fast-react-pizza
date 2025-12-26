import React from 'react'
import { useSelector } from 'react-redux'

export default function UserName() {

  const username = useSelector(state=> state.user.username)

  if(!username) return null;
  return (
    <div className='text-sm uppercase hidden sm:block'>{username} </div>
  )
}
