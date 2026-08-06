

const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_login"
});

conexion.connect((error) => {
    if(error){
        console.log("Error al conectar:", error);
    } else {
        console.log("MySQL conectado correctamente");
    }
});

module.exports = conexion;