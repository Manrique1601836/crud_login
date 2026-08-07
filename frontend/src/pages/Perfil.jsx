

import "./style/perfil.css"

export default function Perfil(){

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );


    return(
        <div className="main-perfil">

            <h1>Perfil</h1>

            <p>
                <strong>nombre:</strong> <p>{usuario.nombre}</p>
            </p>

            <p>
                <strong>email:</strong> {usuario.email}
            </p>

            <p>
                <strong>rol:</strong> {usuario.rol}
            </p>

        </div>
    )
}