import { Routes, Route } from 'react-router-dom';
import PageLogin from '../../Pages/PageLogin';
import MainPage from '../../Pages/MainPage';
import PageNotFound from '../../Pages/PageNotFound';
import PageSignUp from './../../Pages/PageSignup/index';
import BoardPage from '../../Pages/BoardPage';
import WelcomePage from '../../Pages/WelcomePage';
import EditProfile from '../../Pages/EditProfile';

import RequireAuth from '../../hoc/RequireAuth';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/main"
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      <Route
        path="/board"
        element={
          <RequireAuth>
            <BoardPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/signup" element={<PageSignUp />} />
      <Route path="/" element={<WelcomePage />} />
      <Route
        path="/edit-profile"
        element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
