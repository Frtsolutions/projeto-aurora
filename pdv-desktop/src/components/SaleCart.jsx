export default function SaleCart({ cartItems, onRemoveFromCart }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.selling_price * item.quantity), 0).toFixed(2);
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0'
  };

  return (
    <div>
      <h3>Venda Atual</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => (
          <li key={item.product.id} style={itemStyle}>
            <div>
              {item.product.name} <br />
              <small>Qtd: {item.quantity} x R$ {item.product.selling_price}</small>
            </div>
            <button onClick={() => onRemoveFromCart(item.product.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h3>Total: R$ {calculateTotal()}</h3>
    </div>
  );
}