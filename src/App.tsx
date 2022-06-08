import AppRoutes from './Components/AppRoutes/AppRoutes';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Cookies from 'js-cookie';
import { authSlice } from './store/reducers/authSlice';
import { AppBox } from './AppStyle';
import { useAppDispatch } from './store/redux/redux';
import { jwtDecode } from './utils/jwtDecode/jwtDecode';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Suspense } from 'react';

function App() {
  const { setAuthUser, setToken, setUserData } = authSlice.actions;
  const dispatch = useAppDispatch();

  const token = Cookies.get('user');
  if (token) {
    const parseToken = jwtDecode(token);
    dispatch(setUserData(parseToken));

    dispatch(setToken(token));
    dispatch(setAuthUser(true));
  }

  return (
    <Suspense fallback={null}>
      <AppBox>
        <DndProvider backend={HTML5Backend}>
          <Header />
          <AppRoutes />
          <Footer />
        </DndProvider>
      </AppBox>
    </Suspense>
  );
}

export default App;
