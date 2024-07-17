const authMiddlewareService =require("../Authentication/UserAuth")
import { findUserByService } from  "../Services/UserService"

export const adminMiddleware = async (req, res, next) => {
    let header = req.headers.authorization;
    let jwtVerifier = await authMiddlewareService(header, res);
    if(!jwtVerifier) return;
    if (jwtVerifier.is_admin === false)
        return res.status(401, ).json({success:false, message:"Authorization Denied"});
    req.user = jwtVerifier.id;
    req.admin = await findUserByService({_id: jwtVerifier.id})
    return next();
}