import { findUserByService } from "../../Services/UserService.js";


//find a user by an id 
export const getUserController = async (req, res, next) => {
  const user = await findUserByService({ _id: req.userData.id });
  if (user) return res.status(200, ).json({message:"User",data: user})
  if (!user) return res.status(400,  ).json({message:"Error Fetching Resource",});
};