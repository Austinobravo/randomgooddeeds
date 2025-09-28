import React from 'react'
import ResetPasswordPage from './_components/ResetPasswordSection'

const page = () => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <ResetPasswordPage />
    </React.Suspense>
  )
}

export default page