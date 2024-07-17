import  jwt from'jsonwebtoken';
import User from "../Model/UserModel.js"


const auth = async (req, res,next) =>{

    const authHeaders= req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith('Bearer')){
        return res.status(401).json({msg:"Authentication failed"})
    }
   //the split help us to pick out words and destructure to an array
    const token = authHeaders.split(' ')[1]
  
    try {
       const payload = jwt.verify(token, process.env.JWT_SECRET)
    
        
       //once you finds  a smgle user then you stores the payload in to the user which qutomatically get all user information 
        const user = await User.findById(payload.userId)
        req.user=user;
    //    req.user={userId:payload.userId, email:payload.email, first_name:payload.first_name}
    
       next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg:"Auth failed verify token"})
   
    } 
  
}              

export default auth;

