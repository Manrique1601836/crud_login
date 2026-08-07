
import { useState } from "react"
import { Link , useNavigate } from "react-router-dom"

export default function Registro(){

    const [ nombre , setNombre ] = useState("");
    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");

    const navigate = useNavigate();


    const registrarUsuario = (e) => {

        e.preventDefault();

        fetch("http://localhost:3000/usuarios", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                nombre,
                email,
                password
            })

        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            alert("Usuario creado");

            navigate("/")

        });

    }

    return(
        <>
            <Link to="/">
                <button>Registrar</button>
            </Link>

            <h1>
                Regitro
            </h1>

            <form action="" onSubmit={registrarUsuario}>

                <input 
                    type="text" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Crear</button>
            </form>
        </>
    )
}