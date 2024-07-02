const Users = require('../modelo/dao/db/models/user.model'); 
const cart = require('../modelo/dao/db/models/cart.model');

const requireUser = () => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).send("Usuario no autenticado");
            }

            const user = await Users.findById(req.user._id).populate('cart');
            if (!user || !user.cart) {
                return res.status(403).send("Usuario no tiene un carrito asociado");
            }

            req.user = user;
            req.cart = user.cart;

            next();
        } catch (error) {
            console.error('Error en el middleware requireUser:', error);
            res.status(500).send("Error interno del servidor");
        }
    };
};


const requireAdmin = () => {
    return (req, res, next) => {
        if (req.user && req.user.role === "admin") {
            next()

        } else {
            res.status(403).send("Acceso denegado")
        }
    }
}

const requirePremium = () => {
    return (req, res, next) => {
        if (req.user && req.user.role === "premium") {
            next()

        } else {
            res.status(403).send("Acceso denegado")
        }
    }
}


module.exports = { requireAdmin, requireUser, requirePremium }