import Home from '../components/home/Home';
import RegisterPage from '../pages/register';
import PasswordRecovery from '../components/passwordRecovery/PasswordRecovery';
import MedicationPage from '../pages/medication';
import PrescriptionPage from '../pages/prescription';
import HistoryPage from '../pages/history';
import { useAuth } from '../providers/auth-provider/hook';
import { ProtectedRoute } from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '../pages/login';

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, 
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/medicamento',
          element: <MedicationPage />,
        },
        {
          path: '/prescricao',
          element: <PrescriptionPage />,
        },
        {
          path: '/historico',
          element: <HistoryPage />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    // {
    //   path: '/register',
    //   element: <RegisterPage />,
    // },
    // {
    //   path: '/login',
    //   element: <LoginPage />,
    // },
    {
      path: '/password-recovery',
      element: <PasswordRecovery />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
