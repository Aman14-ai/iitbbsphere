import { auth } from '@/lib/auth'
import JEEView from '@/modules/jee/views/JEEView'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { AllowedPrivateContentEmail } from '../../../../constants'

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

      if(!AllowedPrivateContentEmail.includes(session.user.email))
      {
        redirect("/");
      }

  return (
    <div>
      <JEEView />
    </div>
  )
}

export default page
