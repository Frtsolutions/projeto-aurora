import { useState } from 'react';
import axios from 'axios';
import formStyles from './Form.module.css';

export default function ProductForm({ onProductCreated }) {
    const [name, setName] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');

    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    const handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = { name, cost_price: costPrice, selling_price: sellingPrice, stock_quantity: stockQuantity };
        
        // --- A URL CORRETA E DEFINITIVA ---
        const apiUrl = `${apiBaseUrl}/api/products/products/`;

        axios.post(apiUrl, newProduct)
            .then(response => {
                onProductCreated(response.data);
                setName(''); setCostPrice(''); setSellingPrice(''); setStockQuantity('');
            })
            .catch(error => {
                console.error('Erro ao criar o produto:', error);
                alert(`Falha ao criar produto: ${error.response?.data?.error || error.message}`);
            });
    };

    return (
        <div className={formStyles.formContainer}>
            <h3>Cadastrar Novo Produto</h3>
            <form onSubmit={handleSubmit}>
                <div className={formStyles.formGrid}>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Produto" required />
                    <input type="number" step="0.01" value={costPrice} onChange={e => setCostPrice(e.target.value)} placeholder="Preço de Custo" required />
                    <input type="number" step="0.01" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} placeholder="Preço de Venda" required />
                    <input type="number" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} placeholder="Quantidade em Estoque" required />
                </div>
                <div className={formStyles.formActions}>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}