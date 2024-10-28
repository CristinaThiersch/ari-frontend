import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function AppRoutes() {
  return (
    <Routes>
      {/* Rota inicial será a de login */}
      <Route path="/login" element={<LoginForm />} />

      {/* Redireciona para a página de login se a rota não for encontrada */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
