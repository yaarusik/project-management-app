import { useLocation, Navigate } from 'react-router-dom';

import React, { ReactElement } from 'react';
import { useAppSelector } from '../store/redux/redux';

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
