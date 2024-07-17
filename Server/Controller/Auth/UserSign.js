import User from '../../Model/UserModel.js';
import errorhandler from "../../Helpers/ErrorHandller.js"

   const register= async(req,res)=>{
    const { email, password, first_name, last_name, phone_number, is_admin}=req.body;
    if(  !email || !password|| !first_name || !last_name || !phone_number ){
        return res.status(400).json({success:false,message:'please provide the valid information'});
    
    }
    try {
        const user= await User.create({...req.body})
        const token = user.generateToken()
        res.status(201).json({data:{username:user.username,email:user.email, userID: user._id,
            is_admin: user.is_admin,},token})
    } catch (error) {
       console.log(error);
       const errors=errorhandler(error)
        res.status(400).json({errors}); 
        
    }
    
    }
    
    
    const login = async(req,res)=>{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,mesage:'please provide the valid information'});
    }
    try {
        const user=await User.findOne({email})
        if(!user){ 
            throw Error('incorrect Email')
        }
        const authenticated= await user.comparePassword(password)     
    if(!authenticated){
    throw Error('invalid email or  Password')
    
    }
    const token = user.generateToken()
    res.status(201).json({data:{username:user.username,email:user.email, userID:user._id},token})
    
    } catch (error) {
        const errors=errorhandler(error)
        res.status(400).json({errors});
    }
    
    }
    export {
        register,
        login
    }
    