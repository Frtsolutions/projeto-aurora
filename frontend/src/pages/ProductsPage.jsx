import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import EditProductForm from '../components/EditProductForm';
import ProductItem from '../components/ProductItem';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    const fetchProducts = () => {
        const apiUrl = `${apiBaseUrl}/api/products/products/`;
        
        axios.get(apiUrl)
            .then(response => {
                setProducts(response.data.results || []);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setProducts([]);
            });
    };

    // A PEÇA QUE FALTAVA ESTÁ AQUI:
    // Este useEffect garante que a função fetchProducts() seja chamada
    // assim que o componente for montado na tela.
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductCreated = (newProduct) => {
        fetchProducts();
    };

    const handleDeleteProduct = (productId) => {
        const apiUrl = `${apiBaseUrl}/api/products/products/${productId}/`;
        axios.delete(apiUrl)
            .then(() => setProducts(products.filter(product => product.id !== productId)))
            .catch(error => console.error('Erro ao deletar o produto:', error));
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
        setEditingProduct(null);
    };

    return (
        <>
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
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {Array.isArray(products) && products.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        onEdit={setEditingProduct}
                        onDelete={handleDeleteProduct}
                    />
                ))}
            </ul>
        </>
    );
}