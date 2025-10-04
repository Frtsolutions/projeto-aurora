// pdv-desktop/src/App.jsx (Atualizado)

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import SaleCart from './components/SaleCart';
import ProductListItem from './components/ProductListItem';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = () => {
    const apiUrl = `${process.env.VITE_API_URL}/api/products/`;
    axios.get(apiUrl)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro ao buscar produtos da API:', error));
  };

  useEffect(() => {
    fetchProducts();
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

  // --- NOVA LÓGICA DE FINALIZAÇÃO DE VENDA ---
  const handleFinalizeSale = async () => {
    if (cart.length === 0) return;

    // 1. Formata os dados para o formato que a API espera
    const saleData = {
      total_amount: cart.reduce((total, item) => total + (item.product.selling_price * item.quantity), 0).toFixed(2),
      items: cart.map(item => ({
        product: { id: item.product.id }, // Enviamos apenas o ID do produto
        quantity: item.quantity,
      })),
    };

    const apiUrl = `${process.env.VITE_API_URL}/api/products/sales/`;

    try {
      // 2. Envia a requisição POST para a API
      await axios.post(apiUrl, saleData);

      // 3. Em caso de sucesso
      alert('Venda registrada com sucesso!');
      setCart([]); // Limpa o carrinho
      fetchProducts(); // Atualiza a lista de produtos para refletir o novo estoque

    } catch (error) {
      // 4. Em caso de erro
      console.error("Erro ao finalizar a venda:", error.response.data);
      alert(`Falha ao registrar a venda: ${error.response.data.error}`);
    }
  };
  // --- FIM DA NOVA LÓGICA ---

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
        <SaleCart
          cartItems={cart}
          onRemoveFromCart={removeFromCart}
          onFinalizeSale={handleFinalizeSale} // Passa a nova função
        />
      </div>
    </div>
  );
}

export default App;