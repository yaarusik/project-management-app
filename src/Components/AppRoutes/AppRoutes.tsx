import { Routes, Route } from 'react-router-dom';
import PageLogin from '../../Pages/PageLogin';
import PageNotFound from '../../Pages/PageNotFound';
import PageSignUp from './../../Pages/PageSignup/index';

function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/signup" element={<PageSignUp />} />
    </Routes>
  );
}

export default AppRoutes;
