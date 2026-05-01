const jwt = require("jsonwebtoken")

const authMiddleware =  (req,res,next) => {
    const token = req.cookies.token;
    console.log("Auth Middleware, token from cookies", token);
    if(!token){
        res.status(401).send({message:"Unauthorized: No token Provided"});
        return;
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(e){
        return res.status(500).send({message:"Unauthorized: Invalid token"});
    }
}

module.exports = authMiddleware