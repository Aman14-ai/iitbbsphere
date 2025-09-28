import { auth } from '@/lib/auth'
import CommunityView from '@/modules/community/ui/views/CommunityView'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if(!session)
  {
    redirect("/sign-in");
  }
  
    
  return (
    <CommunityView />
  )
}

export default page
