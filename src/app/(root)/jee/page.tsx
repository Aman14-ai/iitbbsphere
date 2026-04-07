import { auth } from '@/lib/auth'
import JEEView from '@/modules/jee/views/JEEView'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata:Metadata={
    title: "IITBBSphere | JEE"
}

const page = async() => {

    const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) {
        redirect("/sign-in");
      }

  return (
    <div>
      <JEEView />
    </div>
  )
}

export default page
