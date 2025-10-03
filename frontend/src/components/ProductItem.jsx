// frontend/src/components/ProductItem.jsx

import styles from './ProductItem.module.css';

function ProductItem({ product, onEdit, onDelete }) {
  return (
    <li className={styles.productCard}>
      <div className={styles.productInfo}>
        <h4>{product.name}</h4>
        <p>Preço de Venda: R$ {product.selling_price}</p>
        <p>Preço de Custo: R$ {product.cost_price}</p>
        <p>Estoque Atual: {product.stock_quantity}</p>
      </div>
      <div className={styles.productActions}>
        <button onClick={() => onEdit(product)}>Editar</button>
        <button className={styles.deleteButton} onClick={() => onDelete(product.id)}>Excluir</button>
      </div>
    </li>
  );
}

export default ProductItem;