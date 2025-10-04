import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import SaleCart from './components/SaleCart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Busca os produtos da API quando o app inicia
  useEffect(() => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/products/health-check/`;

  axios.get(apiUrl)
    .then(response => {
      // Vamos apenas registrar a resposta no console
      console.log('Resposta do Health Check:', response.data);
    })
    .catch(error => {
      console.error('Erro ao chamar o Health Check:', error);
    });
}, []);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className={styles.pdvContainer}>
      <div className={styles.productsPanel}>
        <h3>Produtos</h3>
        <ul className={styles.productList}>
          {products.map(product => (
            <li key={product.id} onClick={() => addToCart(product)} style={{padding: '10px', borderBottom: '1-px solid #eee', cursor: 'pointer'}}>
              {product.name} (R$ {product.selling_price})
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.salePanel}>
        <SaleCart cartItems={cart} />
      </div>
    </div>
  );
}

export default App;