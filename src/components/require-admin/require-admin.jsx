import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setAllowed(false);
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/post-login`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setAllowed(true);
        } else {
          localStorage.removeItem('token');
          setAllowed(false);
        }
      })
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) return <div className="text-red-400">Checking...</div>;

  if (!allowed) return <Navigate to="/" replace />;

  return children;
};

export default RequireAdmin;
