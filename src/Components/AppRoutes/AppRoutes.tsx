import { Routes, Route } from 'react-router-dom';
import PageLogin from '../../Pages/PageLogin';
import MainPage from '../../Pages/MainPage';
import PageNotFound from '../../Pages/PageNotFound';
import PageSignUp from './../../Pages/PageSignup/index';

import WelcomePage from '../../Pages/WelcomePage';

import RequireAuth from '../../hoc/RequireAuth';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/mainPage"
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/signup" element={<PageSignUp />} />
      <Route path="/welcome" element={<WelcomePage />} />
    </Routes>
  );
}

export default AppRoutes;
