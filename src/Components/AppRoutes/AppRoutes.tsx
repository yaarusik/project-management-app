import { Routes, Route } from 'react-router-dom';
import MainPage from '../../Pages/MainPage';
import PageNotFound from '../../Pages/PageNotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
