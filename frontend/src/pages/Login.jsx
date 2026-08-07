
import "./style/login.css"

import { useState } from "react"
import { Link , useNavigate } from "react-router-dom"

export default function Login(){

    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");

    const navigate = useNavigate();

    const ingresar = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.token){

                console.log(data);

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(data.usuario)
                );

                navigate("/dashboard");

            }else{

                alert(data.mensaje);

            }

        })
        
        .catch(error => {
            console.log(error);
            alert("Error de conexión con el servidor");
        });

    }

    return(
        <div className="login">
            

            <Link to="/registro">
                <button className="btnRegistrar">Registrarse</button>
            </Link>

            <form action="" onSubmit={ingresar} className="form">

                <h1>Login</h1>

                <input 
                    type="email" 
                    placeholder=" Ingresa tu correo "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder=" Ingresa tu contraseña "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}