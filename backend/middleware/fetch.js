const jwt = require('jsonwebtoken');
const JWT_SECRET = "kAIFMH@#$"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: "please authenticate using valid token" });
    }
    try {
        const verifyuser = jwt.verify(token, JWT_SECRET);
      //  console.log(verifyuser);
          req.user = verifyuser.user;
          next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" });
    }
}



module.exports = fetchuser;