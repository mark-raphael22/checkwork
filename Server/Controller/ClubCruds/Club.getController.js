import {getAllClubsService,getClubBySingleService} from "../../Services/ClubService.js" 

export const GetAll= async (req, res) =>{
    let clubs= await getAllClubsService (res);
    if(!clubs){
        return res.status(400).json({success: false,msg:"unable to fetch all data:(clubs"})
    }else{
        return res.status(200).json({success: true,msg:"Clubs",clubs})
    }
}

export const GetSingle= async (req, res) =>{
    try {
        let club= await getClubBySingleService ({ _id: req.params.clubID }, res)
    if(!club){
        return res.status(400).json({success: false,msg:"unable to fetch single club  data:"})
    }else{
        return res.status(200).json({success: true,msg:"Clubs"})
    }  
    } catch (error) {
        
    }
  
}

