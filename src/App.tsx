import AppRoutes from './Components/AppRoutes/AppRoutes';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { authSlice } from './store/reducers/authSlice';
import { AppBox } from './AppStyle';
import { useAppDispatch } from './store/redux/redux';

function App() {
  const { setUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  const readCookie = () => {
    const user = Cookies.get('user');
    if (user) {
      dispatch(setUser(true));
      console.log('пользователь есть');
    }
  };

  useEffect(() => {
    console.log('readCookie');
    readCookie();
  }, []);

  return (
    <AppBox>
      <Header />
      <AppRoutes />
      <Footer />
    </AppBox>
  );
}

export default App;
