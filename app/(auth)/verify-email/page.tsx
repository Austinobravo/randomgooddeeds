'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('No token found in URL.');
        return;
      }

      try {
        const res = await axios(`/api/auth/verify-email?token=${token}`);
        if (res.status === 200) {
          setStatus('success');
          router.push("/login?verified=1"); // Redirect to /login?verified=1
        } else {
          setStatus('error');
          setErrorMessage(res.data.error || 'Verification failed.');
        } 
        // if (res.redirected) {
        //   setStatus('success');
        //   router.push(res.url); // Redirect to /login?verified=1
        // } else if (!res.ok) {
        //   const data = await res.json();
        //   setStatus('error');
        //   setErrorMessage(data.error || 'Verification failed.');
        // } else {
        //   setStatus('success');
        // }
      } catch (err:any) {
        setStatus('error');
        setErrorMessage(err?.error || 'Something went wrong. Please try again.');
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
       {status === 'verifying' && (
        <div className="flex items-center gap-2 text-gray-700 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
          Verifying your email...
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center text-green-600">
          <CheckCircle className="w-10 h-10 mb-2" />
          <p className="text-lg font-semibold">Email verified successfully!</p>
          <Button onClick={() => router.push('/login')} className="mt-4 cursor-pointer">
            Go to Login
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center text-red-600">
          <AlertCircle className="w-10 h-10 mb-2" />
          <p className="text-lg font-semibold">{errorMessage}</p>
          <Button variant="outline" onClick={() => router.push('/login')} className="mt-4 cursor-pointer">
            Resend Verification Link
          </Button>
        </div>
      )}
    </div>
  )
}
