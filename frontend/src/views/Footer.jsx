import { Link } from "react-router-dom"
import Logo from "../assets/logoTip.png"

export default function Footer(){
    return(

        <div className="footer">
            <div className="description">
                <img src={Logo} alt="logo-empresa" className="img-logotip"/>
                <p>
                    My Registration es una aplicación web diseñada para facilitar el <br />
                    registro y la gestión de usuarios de manera segura, rápida y sencilla.
                </p>
                </div>
            <div className="retorno">
                <Link to="/dashboard">
                    <button>Inicio</button>
                </Link>

                <p>
                    Protegemos la información de nuestros usuarios y utilizamos sus <br />
                    datos únicamente para brindar un mejor servicio dentro de la plataforma.
                </p>

                <p>
                    © 2026 Me Registro. Todos los derechos reservados.S
                </p>
            </div>
        </div>

    )
}