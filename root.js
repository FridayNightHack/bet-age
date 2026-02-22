import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Home from './pages/Home';
import App from './App';
import AllMatchesModal from './components/allMatchesModal';
import AdminPanel from './pages/AdminPanel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/match/:id',
        element: <AllMatchesModal />,
        shouldRevalidate: () => false,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
      {
        path: 'Secret-Bet-Admin-2025',
        element: <AdminPanel />,
      },
    ],
  },
]);
function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
