import SignUpView from '@/modules/auth/ui/views/SignUpView'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata ={
  title:"IITBBSphere | Sign Up",
}

const page = () => {
  return (
    <SignUpView />
  )
}

export default page
