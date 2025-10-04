// pdv-desktop/src/components/SaleCart.jsx (Atualizado)

export default function SaleCart({ cartItems, onRemoveFromCart, onFinalizeSale }) {
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

  const finalizeButtonStyle = {
    width: '100%',
    padding: '16px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3>Venda Atual</h3>
      <ul style={{ listStyle: 'none', padding: 0, flexGrow: 1, overflowY: 'auto' }}>
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
      <h2>Total: R$ {calculateTotal()}</h2>
      <button
        style={finalizeButtonStyle}
        onClick={onFinalizeSale}
        disabled={cartItems.length === 0}
      >
        Finalizar Venda
      </button>
    </div>
  );
}