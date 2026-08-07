import { useEffect, useState } from "react";
import "./style/usuarios.css"
import EditarRol from "./view/editarRol";

export default function Usuarios(){

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditar, setUsuarioEditar] = useState(null);

    const usuarioLogueado = JSON.parse(
        localStorage.getItem("usuario")
    );



    const cargarUsuarios = () => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:3000/usuarios", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);
            setUsuarios(data);

        });

    };

    useEffect(() => {

        cargarUsuarios();

    }, []);


    if(usuarioLogueado.rol !== "admin"){
        return (
            <h1>
                No tienes permisos para ver esta sección
            </h1>
        )
    }


    const usuarioEliminado = (id) => {

        const confirmar = window.confirm(
            "¿Seguro que quieres eliminar este usuario?"
        );

        if(!confirmar){
                return;
        }

        const token = localStorage.getItem("token");

        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            // quitarlo de la tabla
            setUsuarios(
                usuarios.filter(usuario => usuario.id !== id)
            );

        });

    }

    return(
        <div className="main-usuarios">

            <h1>Usuarios</h1>

            {/* formulario para editar el rol xd */}

            {
                usuarioEditar && (
                    <EditarRol
                        usuario={usuarioEditar}
                        cerrar={() => {
                            setUsuarioEditar(null);
                            cargarUsuarios();
                        }}
                    />
                )
            }

            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>
                    
                <tbody>
                    {
                        usuarios.map(usuario => (

                            <tr key={usuario.id}>

                                <td>
                                    {usuario.nombre}
                                </td>

                                <td>
                                    {usuario.email}
                                </td>

                                <td>
                                    {usuario.rol}
                                </td>

                                <td>
                                    <button onClick={() => setUsuarioEditar(usuario)}>
                                        Editar
                                    </button>

                                    <button onClick={() => usuarioEliminado(usuario.id)}>
                                        Eliminar
                                    </button>
                                </td>

                            </tr>

                        ))
                    }
                </tbody>
            </table>


        </div>
    )
}