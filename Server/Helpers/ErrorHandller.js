const handleErrors=(err)=>{
    //err messages and errors codes- 11000
    let errors={email:"", password:"",};
    if(err.code === 11000){
        errors.email='Email is already in use'
        return errors
    }
    if(err.message ==="incorrect Email")  {
        errors.email= "this email as not been registered";
        return errors;
    }
    if(err.message ==="invalid email or  Password")  {
        errors.email= "Invalid Email or password";
        errors.password= "Invalid email or password";
        return errors;
    }
 
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
    }  
    
    return errors

}
export default handleErrors