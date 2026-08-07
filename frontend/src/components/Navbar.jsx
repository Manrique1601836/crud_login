
import { House } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return(

        <ul>
            <li><Link to="/dashboard">
                    <House/>
                </Link></li>
            <li><Link to="/dashboard/perfil">Perfil</Link></li>
            <li><Link to="/dashboard/usuarios">Usuario</Link></li>
        </ul>

    )
}