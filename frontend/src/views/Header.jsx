
import Lupa from "../components/Lupa"
import Navbar from "../components/Navbar"

import Logo from "../assets/logoTip.png"

import { useNavigate } from "react-router-dom"

export default function Header(){

    const navigate = useNavigate();

    const cerrarSesion = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        console.log("removidos")

        navigate("/");

    }

    return(

        <div className="header">
            <div className="top-header">
                {/* <img src={Logo} alt="logo-empresa" className="img-logotip-header"/> */}
                <h1>me registro</h1>
                <Lupa/>
            </div>
            <div className="botton-header">
                <Navbar/>

                <button onClick={cerrarSesion}>Cerrar sesion</button>
            </div>
        </div>

    )
}