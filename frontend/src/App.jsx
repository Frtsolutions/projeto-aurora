// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductForm from './components/ProductForm';
import EditProductForm from './components/EditProductForm'; // 1. Importa o novo formulário

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // 2. Novo estado para controlar a edição

  const fetchProducts = () => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => { setProducts(response.data); })
      .catch(error => { console.error('Erro ao buscar os produtos:', error); });
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:8000/api/products/${productId}/`)
      .then(() => {
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => { console.error('Erro ao deletar o produto:', error); });
  };

  // 3. Função chamada quando o formulário de edição é salvo
  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null); // Fecha o formulário de edição
  };

  return (
    <div>
      <h1>Projeto Aurora - Gestão de Estoque</h1>

      {/* 4. Lógica para mostrar um formulário ou outro */}
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
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - R$ {product.selling_price} (Estoque: {product.stock_quantity})

            {/* 5. Botões de Editar e Excluir */}
            <button onClick={() => setEditingProduct(product)} style={{ marginLeft: '10px' }}>
              Editar
            </button>
            <button onClick={() => handleDeleteProduct(product.id)} style={{ marginLeft: '10px' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;