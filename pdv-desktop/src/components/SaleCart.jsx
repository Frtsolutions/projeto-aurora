export default function SaleCart({ cartItems }) {
  return (
    <div>
      <h3>Venda Atual</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - R$ {item.selling_price}
          </li>
        ))}
      </ul>
      {/* Futuramente, aqui teremos o total e o botão de finalizar venda */}
    </div>
  );
}