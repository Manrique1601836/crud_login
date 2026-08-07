const bcrypt = require("bcrypt");

const {

    usuarioVer,
    usuarioAgg,
    usuarioBuscarPorId,
    usuarioEditarPorId,
    usuarioEliminarPorId,
    usuarioEditarRol

} = require("../models/usuario.models")

// leer usuarios
const usuarioRead = (req, res) => {

    usuarioVer((error, usuarios) => {

        if(error){
            return res.status(500).json(error);
        }

        const usuariosSinPassword = usuarios.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        }));

        res.json(usuariosSinPassword);

    });

};

//  agregar nuevo usuario
const usuarioAdd = async (req,res)=>{

    const {nombre,email,password} = req.body;


    const passwordEncriptada = await bcrypt.hash(password, 10);


    usuarioAgg(nombre,email,passwordEncriptada,(error,nuevoUsuario)=>{

        if(error){
            return res.status(500).json(error);
        }

        res.json({
            mensaje:"Usuario creado correctamente",
            usuario:nuevoUsuario
        });

    });

};

// consultar usuario epecifico
const usuarioId = (req, res) => {

    usuarioBuscarPorId(Number(req.params.id), (error, usuario)=>{

    if(error){
        return res.status(500).json(error);
    }

    if(!usuario){
        return res.status(404).json({
            mensaje:"Usuario no encontrado"
        });
    }

    res.json(usuario);

});
};


// editar usuario 
const usuarioUpdate = (req,res) => {

    const id = Number(req.params.id);
    const { nombre } = req.body;


    usuarioEditarPorId(id, nombre, (error, resultado)=>{

        if(error){
            return res.status(500).json(error);
        }


        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje:"Usuario no encontrado"
            });
        }


        res.json({
            mensaje:"Usuario actualizado correctamente"
        });

    });

};


//   eliminar usuario
const usuarioDelete = (req,res) => {

    const id = Number(req.params.id);


    usuarioEliminarPorId(id, (error, resultado)=>{

        if(error){
            return res.status(500).json(error);
        }


        if(resultado.affectedRows === 0){
            return res.status(404).json({
                mensaje:"Usuario no encontrado"
            });
        }


        res.json({
            mensaje:"Usuario eliminado correctamente"
        });

    });

};

const cambiarRol = (req,res)=>{

    const id = Number(req.params.id);
    const { rol } = req.body;

    console.log(req.body);
    console.log(rol);

    usuarioEditarRol(id, rol, (error, resultado)=>{

        if(error){
            return res.status(500).json(error);
        }

        res.json({
            mensaje:"Rol actualizado correctamente"
        });

    });

};

module.exports = {
    usuarioRead,
    usuarioAdd,
    usuarioId,
    usuarioUpdate,
    usuarioDelete,
    cambiarRol
}