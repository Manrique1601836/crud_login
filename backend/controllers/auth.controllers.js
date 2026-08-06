// console.log("ESTE ES EL AUTH CONTROLLER NUEVO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const {
    usuarioAgg,
    usuarioBuscarPorEmail,
    usuarioBuscarPorId,
    usuarioEditarPorId,
    usuarioCambiarPassword
} = require("../models/usuario.models")

const registro = (req, res) => {

    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    if (typeof password !== "string") {
        return res.status(400).json({
            mensaje: "La contraseña debe ser texto"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            mensaje: "La contraseña debe tener al menos 6 caracteres"
        });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        return res.status(400).json({
            mensaje: "El correo no es válido"
        });
    }

    usuarioBuscarPorEmail(email, async (error, usuario) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (usuario) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        usuarioAgg(nombre, email, passwordEncriptada, (error, nuevoUsuario) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.status(201).json({
                mensaje: "Usuario registrado correctamente",
                usuario: nuevoUsuario
            });

        });

    });

};

const login = (req, res) => {

    const { email, password } = req.body;
    // console.log("Entró al login");

    if (!email || !password) {
        return res.status(400).json({
            mensaje: "Email y contraseña son obligatorios"
        });
    }

    usuarioBuscarPorEmail(email, async (error, usuario) => {

        console.log(usuario);

        if (error) {
            return res.status(500).json(error);
        }

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const coincide = await bcrypt.compare(password, usuario.password);
        console.log("Resultado contraseña:", coincide);

        if (!coincide) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            mensaje: "Login correcto",
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });      

    });

};


const perfil = (req, res) => {

    const id = req.usuario.id;

    usuarioBuscarPorId(id, (error, usuario) => {

        if(error){
            return res.status(500).json(error);
        }

        if(!usuario){
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email
        });

    });

};


const editarPerfil = (req, res) => {

    const id = req.usuario.id;

    const { nombre } = req.body;


    if(!nombre){
        return res.status(400).json({
            mensaje: "El nombre es obligatorio"
        });
    }


    usuarioEditarPorId(id, nombre, (error, resultado)=>{

        if(error){
            return res.status(500).json(error);
        }


        res.status(200).json({
            mensaje: "Perfil actualizado correctamente"
        });

    });

};

const cambiarPassword = (req, res) => {

    const id = req.usuario.id;

    const { passwordActual, passwordNueva } = req.body;


    if (!passwordActual || !passwordNueva) {
        return res.status(400).json({
            mensaje: "Debes enviar la contraseña actual y la nueva"
        });
    }

    if (passwordNueva.length < 6) {
        return res.status(400).json({
            mensaje: "La nueva contraseña debe tener al menos 6 caracteres"
        });
    }


    usuarioBuscarPorId(id, async (error, usuario) => {

        if(error){
            return res.status(500).json(error);
        }


        const coincide = await bcrypt.compare(
            passwordActual,
            usuario.password
        );


        if(!coincide){
            return res.status(401).json({
                mensaje: "Contraseña actual incorrecta"
            });
        }

        if (passwordActual === passwordNueva) {
            return res.status(400).json({
                mensaje: "La nueva contraseña debe ser diferente a la actual"
            });
        }


        const nuevaPasswordEncriptada = await bcrypt.hash(
            passwordNueva,
            10
        );


        usuarioCambiarPassword(
            id,
            nuevaPasswordEncriptada,
            (error)=>{

                if(error){
                    return res.status(500).json(error);
                }


                res.status(200).json({
                    mensaje: "Contraseña actualizada correctamente"
                });

            }
        );

    });

};

module.exports = {
    registro,
    login,
    perfil,
    editarPerfil,
    cambiarPassword
};
