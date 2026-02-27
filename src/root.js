import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Home from './pages/Home';
import App from './App';
import AllMatchesModal from './components/allMatchesModal';
import AdminLogin from './pages/admin/auth/adminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import RequireAdmin from './components/require-admin/require-admin';

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
        path: 'Secret-Bet-Admin',
        element: <AdminLogin />,
      },
      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <AdminPanel />
          </RequireAdmin>
        ),
      },
    ],
  },
]);
function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
