
import Welcome from "../assets/welcome.jpg"

export default function Inicio(){
    return(
        <>

            <div className="main-inicio">
                <h1> Bienvenido Admin</h1>

                <div className="wel">
                    <p><strong>Me Registro </strong> es una aplicación web desarrollada para facilitar el 
                        registro y la administración de usuarios de forma segura y eficiente. 
                        La plataforma permite crear cuentas, iniciar sesión, gestionar perfiles 
                        y, para los administradores, visualizar, editar y administrar los 
                        usuarios registrados desde un panel centralizado.
                    </p>
                    <img src={Welcome} alt="welcome" className="img-welcome"/>
                </div>
            </div>

        </>
    )
}