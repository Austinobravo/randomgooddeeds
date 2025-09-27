import React from 'react'
import { DetailsForm } from './_components/DetailsForm'
import { PasswordForm } from './_components/PasswordForm'

const SettingsPage = () => {
  return (
    <section className='space-y-12'>
        <DetailsForm />
        <PasswordForm />
    </section>
  )
}

export default SettingsPage