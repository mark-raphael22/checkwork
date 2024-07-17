import {  joinClubService,
    updateClubService,deleteClubService } from "../../Services/ClubService.js"

import  {formatUserService }from "../../Services/UserService.js"

export const editClubController = async (req, res) =>{
    const data=req.body;
try {
    const updatedClub=await updateClubService(data,req,res)
    if (updatedClub){
        return res.status(200).json({success:true, message:   "Edited club detail successfully"   ,   updatedClub})
    }
  if (!updatedClub) return res.status(400).json({success:false, message: "Could not edit club"})
} catch (error) {
    console.log(error);
    return Error()
  
}
}       

export const JoinClubController =  async (req, res) =>{
    let user = await joinClubService(req, res);
    let formattedUser = await formatUserService(user)
    if (user) return res.status(200 ).json({data:formattedUser})


}


export const deleteClubController = async (req, res) => {
    let club = await deleteClubService(req, res);
    if (club) return res.status(200).json({success :true, message :"Deleted club successfully"});
    if (!club) return res.status(200).json({success :true, message :"Could not complete the transaction"});
  };