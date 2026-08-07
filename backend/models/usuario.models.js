
const db = require("../database")
// usuario
// let usuarios = [
//     {
//         id: 1,
//         nombre: "Jesus"
//     },
//     {
//         id: 2,
//         nombre: "Pedro"
//     }
// ];

const usuarioVer = (callback) => {

    db.query("SELECT * FROM usuarios", (error, resultados)=>{

        if(error){
            callback(error, null);
            return;
        }

        callback(null, resultados);

    });

};


const usuarioAgg = (nombre, email, password, callback) => {

    const sql = `
        INSERT INTO usuarios (nombre, email, password, rol)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nombre, email, password, "usuario"],
        (error, resultado)=>{

            if(error){
                callback(error, null);
                return;
            }

            callback(null, {
                id: resultado.insertId,
                nombre,
                email,
                password,
                rol: "usuario"
            });

        }
    );

};

const usuarioBuscarPorId = (id, callback) => {

    db.query(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
        (error, resultado)=>{

            if(error){
                callback(error, null);
                return;
            }

            callback(null, resultado[0]);

        }
    );

};


const usuarioEditarPorId = (id, nombre, callback) => {

    const sql = `
        UPDATE usuarios 
        SET nombre = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [nombre, id],
        (error, resultado)=>{

            if(error){
                callback(error, null);
                return;
            }

            callback(null, resultado);

        }
    );

};

const usuarioEditarRol = (id, rol, callback) => {

    const sql = `
        UPDATE usuarios
        SET rol = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [rol, id],
        (error, resultado)=>{

            if(error){
                callback(error, null);
                return;
            }

            callback(null, resultado);

        }
    );

};

const usuarioEliminarPorId = (id, callback) => {

    db.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        (error, resultado)=>{

            if(error){
                callback(error, null);
                return;
            }

            callback(null, resultado);

        }
    );

};


const usuarioBuscarPorEmail = (email, callback) => {

    db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
        (error, resultado)=>{

            if(error){
                callback(error, null);
                return;
            }

            callback(null, resultado[0]);

        }
    );

};

const usuarioCambiarPassword = (id, password, callback) => {

    const sql = `
        UPDATE usuarios
        SET password = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [password, id],
        (error, resultado)=>{

            if(error){
                callback(error);
                return;
            }

            callback(null, resultado);

        }
    );

};

module.exports = {
    usuarioVer,
    usuarioAgg,
    usuarioBuscarPorId,
    usuarioEditarPorId,
    usuarioEliminarPorId,
    usuarioBuscarPorEmail,
    usuarioCambiarPassword,
    usuarioEditarRol
}