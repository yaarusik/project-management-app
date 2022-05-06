import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../../Pages/PageNotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
