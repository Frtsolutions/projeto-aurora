import { useState, useEffect } from 'react';
import axios from 'axios';
import formStyles from './Form.module.css';

function EditProductForm({ product, onProductUpdated, onCancel }) {
  const [name, setName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name); setCostPrice(product.cost_price);
      setSellingPrice(product.selling_price); setStockQuantity(product.stock_quantity);
    }
  }, [product]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = { name, cost_price: costPrice, selling_price: sellingPrice, stock_quantity: stockQuantity };
    axios.put(`http://localhost:8000/api/products/${product.id}/`, updatedProduct)
      .then(response => onProductUpdated(response.data))
      .catch(error => console.error('Erro ao atualizar o produto:', error));
  };

  return (
    <div className={formStyles.formContainer}>
      <h3>Editar Produto: {product.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className={formStyles.formGrid}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          <input type="number" step="0.01" value={costPrice} onChange={e => setCostPrice(e.target.value)} required />
          <input type="number" step="0.01" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} required />
          <input type="number" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} required />
        </div>
        <div className={formStyles.formActions}>
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
export default EditProductForm;