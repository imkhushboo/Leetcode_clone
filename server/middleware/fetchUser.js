const jwt = require("jsonwebtoken");
const JWT_S = "hehjbfjbsjbk@djfn";

fetchUser = async (req, res, next) => {
    const token = await req.header("auth-token").token;
    //   console.log(token);
    if (!token) {
        return res.status(600).send({ error: "not valid token" });
    }
    try {
        const data = await jwt.verify(token, JWT_S);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(500).send(err);
    }
};

authUser = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        console.log(token);
        const data = await jwt.verify(token, JWT_S);
        if (!data) {
            const err = 'Authentication Failed !!';
            throw err;
        } req.user = data;
        // console.log(req.user);
        next();
    }
    catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
}

module.exports = { fetchUser, authUser };
