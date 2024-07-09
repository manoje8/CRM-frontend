import './App.css';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';

function App({children}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}

export default App;
