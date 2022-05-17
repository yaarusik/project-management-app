import { Routes, Route } from 'react-router-dom';
import PageLogin from '../../Pages/PageLogin';
import MainPage from '../../Pages/MainPage';
import PageNotFound from '../../Pages/PageNotFound';
import PageSignUp from './../../Pages/PageSignup/index';
import BoardPage from '../../Pages/BoardPage';

import WelcomePage from '../../Pages/WelcomePage';

import RequireAuth from '../../hoc/RequireAuth';

const AppRoutes = () => {
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
      <Route path="/board" element={<BoardPage />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/signup" element={<PageSignUp />} />
      <Route path="/" element={<WelcomePage />} />
    </Routes>
  );
};

export default AppRoutes;
