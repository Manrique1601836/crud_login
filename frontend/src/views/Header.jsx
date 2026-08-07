
import Lupa from "../components/Lupa"
import Navbar from "../components/Navbar"

import Logo from "../assets/logoTip.png"

import { useNavigate } from "react-router-dom"

export default function Header(){

    const navigate = useNavigate();

    const cerrarSesion = () => {

        const confirmar = window.confirm("¿Deseas salir de la web?");

        if (!confirmar) {
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        console.log("sesion cerrada")

        navigate("/");

    }

    return(

        <div className="header">
            <div className="top-header">
                {/* <img src={Logo} alt="logo-empresa" className="img-logotip-header"/> */}
                <h1>Me Registro</h1>
                <Lupa/>
            </div>
            <div className="botton-header">
                <Navbar/>

                <button onClick={cerrarSesion}>Cerrar sesion</button>
            </div>
        </div>

    )
}