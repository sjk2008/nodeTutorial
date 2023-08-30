const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Fix typo here
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN); // Make sure the secret matches

        req.user = decode;
        next();
    } catch (error) {
        if(error.name == "TokenExpiredError"){
            res.status(401).json({
                message:'Token Expired'
            })
        }else{
             res.status(401).json({ message: 'Authentication Failed!' }); // Use status 401 for authentication failure
        }
       
    }
}

module.exports = authenticate;
