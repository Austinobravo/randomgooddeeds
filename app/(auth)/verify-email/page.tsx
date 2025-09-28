import React from 'react'
import VerifyEmailPage from './_components/VerifyEmail'

const page = () => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <VerifyEmailPage />
    </React.Suspense>
  )
}

export default page