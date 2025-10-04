import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import SaleCart from './components/SaleCart';
import ProductListItem from './components/ProductListItem';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // No Webpack, as variáveis de ambiente são acessadas de forma diferente
    const apiUrl = `${process.env.VITE_API_URL}/api/products/`; 
    axios.get(apiUrl)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro ao buscar produtos da API:', error));
  }, []);

  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product: productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productIdToRemove) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productIdToRemove);
      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.product.id !== productIdToRemove);
      } else {
        return prevCart.map(item =>
          item.product.id === productIdToRemove
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  return (
    <div className={styles.pdvContainer}>
      <div className={styles.productsPanel}>
        <h3>Produtos</h3>
        <ul className={styles.productList}>
          {products.map(product => (
            <ProductListItem
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </ul>
      </div>

      <div className={styles.salePanel}>
        <SaleCart cartItems={cart} onRemoveFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default App;