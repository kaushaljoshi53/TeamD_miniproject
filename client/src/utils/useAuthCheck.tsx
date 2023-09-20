import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // No token found in localStorage, user is not authenticated, redirect to Signin
      navigate('/');
    }
  }, [navigate]);
}