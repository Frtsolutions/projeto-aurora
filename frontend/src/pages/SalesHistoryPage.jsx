import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SalesHistoryPage() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    useEffect(() => {
        // CORREÇÃO FINAL DA URL
        axios.get(`${apiBaseUrl}/api/sales/`)
            .then(response => {
                setSales(response.data.results); // Supondo que a API de vendas também seja paginada
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar histórico de vendas:", err);
                setError("Não foi possível carregar o histórico de vendas.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Carregando histórico de vendas...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Histórico de Vendas</h2>
            {sales.length === 0 ? (
                <p>Nenhuma venda registrada ainda.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {sales.map(sale => (
                        <li key={sale.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                            <h4>Venda #{sale.id} - Total: R$ {sale.total_amount}</h4>
                            <small>Data: {new Date(sale.created_at).toLocaleString('pt-BR')}</small>
                            <ul>
                                {sale.items.map(item => (
                                    <li key={item.product.id}>
                                        {item.quantity}x {item.product.name} (R$ {item.price_at_sale} cada)
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}