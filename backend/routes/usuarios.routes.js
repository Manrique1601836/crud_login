
const express = require("express");
const router = express.Router();

const {

    usuarioRead,
    usuarioAdd,
    usuarioId,
    usuarioUpdate,
    usuarioDelete

} = require("../controllers/usuarios.controllers");

const {
    verificarToken
} = require("../middlewares/auth.middleware");

const {
    verificarAdmin
} = require("../middlewares/admin.middleware");


// leer usuario
router.get("/", verificarToken ,usuarioRead);


// agregar usuario
router.post("/", verificarToken, usuarioAdd);


// consultar usuario especifico
router.get("/:id", verificarToken, usuarioId);


// editar usuario especifico
router.put("/:id", verificarToken, usuarioUpdate);


// eliminar usuario especifico
router.delete("/:id", verificarToken, verificarAdmin, usuarioDelete);

module.exports = router;