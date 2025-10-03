// frontend/src/components/EditProductForm.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

function EditProductForm({ product, onProductUpdated, onCancel }) {
  const [name, setName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  // Preenche o formulário com os dados do produto quando ele muda
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCostPrice(product.cost_price);
      setSellingPrice(product.selling_price);
      setStockQuantity(product.stock_quantity);
    }
  }, [product]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      name,
      cost_price: costPrice,
      selling_price: sellingPrice,
      stock_quantity: stockQuantity,
    };

    axios.put(`http://localhost:8000/api/products/${product.id}/`, updatedProduct)
      .then(response => {
        onProductUpdated(response.data); // Informa o componente pai da atualização
      })
      .catch(error => {
        console.error('Erro ao atualizar o produto:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Produto: {product.name}</h3>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="number"
        value={costPrice}
        onChange={e => setCostPrice(e.target.value)}
        required
      />
      <input
        type="number"
        value={sellingPrice}
        onChange={e => setSellingPrice(e.target.value)}
        required
      />
      <input
        type="number"
        value={stockQuantity}
        onChange={e => setStockQuantity(e.target.value)}
        required
      />
      <button type="submit">Salvar Alterações</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default EditProductForm;