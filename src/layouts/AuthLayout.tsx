import useTokenStore from '@/zustand/store'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {

  // const {token}=useTokenStore((state)=>state)

  // if(!token) return <Navigate to="/auth/login" replace={true}/>
  return (
   <>
   
   <Outlet/>
   </>
  )
}

export default AuthLayout