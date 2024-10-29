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
import MedicationsFormPage from '../components/medication/MedicationForm';
import PrescriptionFormPage from '../components/prescription/PrescriptionForm';

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
          path: '/medicamento/cadastrar',
          element: <MedicationsFormPage />, // Adiciona a rota para o formulário
        },
        {
          path: '/prescricao',
          element: <PrescriptionPage />,
        },
        {
          path: '/prescricao/cadastrar',
          element: <PrescriptionFormPage />, // Adiciona a rota para o formulário
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
