// frontend/src/App.jsx (Final)
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css'; // Usando nosso novo CSS Module
import ProductForm from './components/ProductForm';
import EditProductForm from './components/EditProductForm';
import ProductItem from './components/ProductItem'; // Importa o ProductItem

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro ao buscar os produtos:', error));
  }, []);

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:8000/api/products/${productId}/`)
      .then(() => setProducts(products.filter(product => product.id !== productId)))
      .catch(error => console.error('Erro ao deletar o produto:', error));
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Projeto Aurora - Gestão de Estoque</h1>
      </header>
      <main>
        {editingProduct ? (
          <EditProductForm
            product={editingProduct}
            onProductUpdated={handleProductUpdated}
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <ProductForm onProductCreated={handleProductCreated} />
        )}

        <hr />
        <h2>Lista de Produtos</h2>
        <ul className={styles.productList}>
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onEdit={setEditingProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;