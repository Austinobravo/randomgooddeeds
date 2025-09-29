import React from 'react'
import { DetailsForm } from './_components/DetailsForm'
import { PasswordForm } from './_components/PasswordForm'
import { getCurrentUser } from '@/lib/getServerSession'

const SettingsPage = async () => {
  const user = await getCurrentUser()
  return (
    <section className='space-y-12'>
        <DetailsForm user={user}/>
        <PasswordForm />
    </section>
  )
}

export default SettingsPage