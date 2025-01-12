const verifyRolesTest = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.sendStatus(401);
        const hasRoles = req.roles.some(role => allowedRoles.includes(role))
        if(!hasRoles) return res.sendStatus(401)
        next();
    };
};

module.exports = verifyRolesTest;
