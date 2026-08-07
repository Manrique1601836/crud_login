
import { X } from 'lucide-react';

import { useState } from "react";

export default function EditarRol({usuario, cerrar}){

    const [rol, setRol] = useState(usuario.rol);

    const cerrarAhora = () => {

        cerrar()

    }

    const guardarCambios = (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");


        fetch(`http://localhost:3000/usuarios/${usuario.id}/rol`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                rol: rol
            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            alert("Rol actualizado");

            cerrar();

        });

    }


    return(
        <div className="overlay-rol">
            <form onSubmit={guardarCambios} className="form-rol" >

                <h2>
                    <strong>Usuario: </strong> <p>{usuario.nombre}</p>
                </h2>


                <p>
                    Rol actual: {usuario.rol}
                </p>


                <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                >

                    <option value="usuario">
                        Usuario
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                </select>


                <button type="submit" className='btnGuardarAhora'>
                    Guardar
                </button>

                <button type="button" onClick={cerrarAhora} className='btnCerrarAhora'>
                    <X/>
                </button>


            </form>
        </div>
    )
}