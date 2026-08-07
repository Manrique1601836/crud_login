

import "./style/perfil.css"

export default function Perfil(){

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );


    return(
        <div className="main-perfil">

            <h1>Perfil</h1>

            <p>
                Nombre: {usuario.nombre}
            </p>

            <p>
                Email: {usuario.email}
            </p>

            <p>
                Rol: {usuario.rol}
            </p>

        </div>
    )
}