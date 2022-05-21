import AppRoutes from './Components/AppRoutes/AppRoutes';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Cookies from 'js-cookie';
import { authSlice } from './store/reducers/authSlice';
import { AppBox } from './AppStyle';
import { useAppDispatch } from './store/redux/redux';

function App() {
  const { setAuthUser, setToken } = authSlice.actions;
  const dispatch = useAppDispatch();

  const token = Cookies.get('user');
  if (token) {
    dispatch(setToken(token));
    dispatch(setAuthUser(true));
  }

  return (
    <AppBox>
      <Header />
      <AppRoutes />
      <Footer />
    </AppBox>
  );
}

export default App;
