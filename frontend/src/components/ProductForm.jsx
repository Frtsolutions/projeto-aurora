// frontend/src/components/ProductForm.jsx

import { useState } from 'react';
import axios from 'axios';

function ProductForm({ onProductCreated }) {
  const [name, setName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const newProduct = {
      name: name,
      cost_price: costPrice,
      selling_price: sellingPrice,
      stock_quantity: stockQuantity,
    };

    axios.post('http://localhost:8000/api/products/', newProduct)
      .then(response => {
        onProductCreated(response.data); // Avisa o componente pai sobre o novo produto
        // Limpa os campos do formulário
        setName('');
        setCostPrice('');
        setSellingPrice('');
        setStockQuantity('');
      })
      .catch(error => {
        console.error('Erro ao criar o produto:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Cadastrar Novo Produto</h3>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nome do Produto"
        required
      />
      <input
        type="number"
        value={costPrice}
        onChange={e => setCostPrice(e.target.value)}
        placeholder="Preço de Custo"
        required
      />
      <input
        type="number"
        value={sellingPrice}
        onChange={e => setSellingPrice(e.target.value)}
        placeholder="Preço de Venda"
        required
      />
      <input
        type="number"
        value={stockQuantity}
        onChange={e => setStockQuantity(e.target.value)}
        placeholder="Quantidade em Estoque"
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default ProductForm;