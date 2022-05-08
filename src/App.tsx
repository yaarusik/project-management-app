import AppRoutes from './Components/AppRoutes/AppRoutes';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App({ className }: { className: string }) {
  return (
    <div className={className}>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
