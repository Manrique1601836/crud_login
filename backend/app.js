
require("dotenv").config();

const db = require("./database");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Middleware para recibir JSON


// importar rutas
const authRoutes = require("./routes/auth.routes");
const usuariosRoutes = require("./routes/usuarios.routes");


// usar rutas
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);


// ruta inicial
app.get("/", (req, res) => {
    res.send("Hola Mundo");
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

