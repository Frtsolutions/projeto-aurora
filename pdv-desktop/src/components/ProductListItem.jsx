export default function ProductListItem({ product, onAddToCart }) {
  const itemStyle = {
    padding: '12px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <li style={itemStyle} onClick={() => onAddToCart(product)}>
      <span>{product.name}</span>
      <strong>R$ {product.selling_price}</strong>
    </li>
  );
}