const jwt = require("jsonwebtoken");




const verificarToken = (req, res, next) => {

    console.log("ENTRO AL MIDDLEWARE");

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            mensaje: "Token requerido"
        });
    }


    try {

        const tokenLimpio = token.replace("Bearer ", "");

        const usuario = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        req.usuario = usuario;

        next();

    } catch(error) {

        return res.status(401).json({
            mensaje: "Token inválido"
        });

    }

};


module.exports = {
    verificarToken
};