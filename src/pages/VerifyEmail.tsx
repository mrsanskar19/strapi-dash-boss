
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { DATABASE_URL } from '../lib/env';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const query = useQuery();
  const token = query.get('token');

  const handleVerification = async () => {
    if (!token) {
      setMessage('No verification token found.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${DATABASE_URL}/api/v1/auth/verify-email?token=${token}`)
      const data = await res.json()
      console.log(data)
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to verify email. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Verify Your Email</h1>
        {message ? (
          <p className="text-center">{message}</p>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-center mb-4">Click the button below to verify your email address.</p>
            <Button onClick={handleVerification} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
