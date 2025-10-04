import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link to="/">Produtos</Link>
                </li>
                <li>
                    <Link to="/sales">Histórico de Vendas</Link>
                </li>
            </ul>
        </nav>
    );
}