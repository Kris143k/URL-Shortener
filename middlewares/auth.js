const {getUser} = require("../Service/auth");

async function checkForAuth(req, res, next) {
    const tokenCookie = req.cookies?.uid;
    req.user = null;
    if(!tokenCookie) {
        return next();
    }
    const token = tokenCookie;
    if(!token) {
        return next();
    }
    const user =await getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles=[]) {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect("/login");
        }
        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({ error: "You are not allowed to perform this action" });
        }
        next();
    };
}

module.exports = {
    checkForAuth,
    restrictTo,
};


// function restrictToLoggedInUserOnly(req, res, next) {
//     const sessionId = req.cookies?.uid;
//     //const sessionId = req.headers["authorization"];
//     if (!sessionId) {
//         return res.redirect("/login");
//     }
//     //const token = sessionId.split(" ")[1];//Bearer token
//     //const user = getUser(token);
//     const user = getUser(sessionId);
//     if (!user) {
//         return res.redirect("/login");
//     }
//     req.user = user;
//     next();
// }

// function checkAuth(req, res, next) {
//     //const sessionId = req.headers["authorization"];
//     //const token = sessionId.split(" ")[1];//Bearer token
//     const sessionId = req.cookies?.uid;
//     //const user = getUser(token);
//     const user = getUser(sessionId);
//     req.user = user;
//     next();
// }

// module.exports = {
//     restrictToLoggedInUserOnly,
//     checkAuth,
// };
