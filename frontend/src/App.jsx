import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import SalesHistoryPage from './pages/SalesHistoryPage';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/sales" element={<SalesHistoryPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;