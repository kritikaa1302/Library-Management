import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { BorrowProvider } from './context/BorrowContext';
import AppRoutes from './routes';
import Toast from './components/Toast';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
          <BorrowProvider>
            <AppRoutes />
            <Toast />
          </BorrowProvider>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;