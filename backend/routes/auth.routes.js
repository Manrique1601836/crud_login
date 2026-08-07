

const express = require("express");
const router = express.Router();

const {
    registro,
    login,
    perfil,
    editarPerfil,
    cambiarPassword
} = require("../controllers/auth.controllers");

const {
    verificarToken
} = require("../middlewares/auth.middleware");



// registro de usuario
router.post("/registro", registro);
router.post("/login", login)
router.get("/perfil", verificarToken, perfil);
router.put("/perfil", verificarToken, editarPerfil);
router.put("/password", verificarToken, cambiarPassword);

module.exports = router;