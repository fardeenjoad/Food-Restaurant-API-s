import Jwt, { decode } from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
try {
    const token = req.headers["authorization"].split(" ")[1];
    Jwt.verify(token,process.env.JWT_SECRET_KEY, (err,decode) => {
        if(err) {
            return res.status(401).send({message:"unauthorized"});
        } else {
            req.body.id = decode.id;
            next()
        }
    })
} catch (error) {
    console.log(error);
    return res.status(401).send({message:"Error in Auth api"});
}
}

export default verifyToken