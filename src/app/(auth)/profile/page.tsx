import { auth } from '@/lib/auth'
import ProfileViews from '@/modules/profile/ui/views/ProfileViews'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {

  const session = await auth.api.getSession({
    headers:await headers(),
  })
  if(!session)
  {
    redirect("/sign-in");
  }

  return (
    <ProfileViews />
  )
}

export default page
