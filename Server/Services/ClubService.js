import {Club}from "../Model/ClubModel.js";
import User from "../Model/UserModel.js";


//creating a club servivce 
export const createClubService=async (req, res,data ) => {
    try {
   
        const club = await Club.create(data);
        return club;  
      } catch (error) {
        console.log(error);
        return Error()
   
      }
}


export const getClubBySingleService = async (data, res) => {
    try {
      let clubs = await Club.findOne(data)
        .populate({ path: "posts", select: "body likes comments" })  
        .populate({ path: "members", select: "first_name last_name email" });
  
      return clubs;
    } catch (error) {
      return false;
    }
  };

  
export const updateClubService = async (data, req, res) => {
    const {clubID}=req.params;
    try {
      let club = await Club.findByIdAndUpdate({ _id: clubID }, data, {
        new: true,runValidators: true
      });
      return club;
    } catch (error) {
      console.log(error);
      return errorMessage(401, error._message, null)(res);
    }
  };

  //getting all club service 
  export const getAllClubsService = async (res) => {
    try {
      let clubs = await Club.find({})
        .populate({
          path: "posts",
          select: "body likes comments club",
          populate: {
            path: "comments",
            select: "body user",
            populate: { path: "user", select: "first_name last_name" },
          },
        })
        .populate({ path: "members", select: "first_name last_name email" });
      return clubs;
    } catch (error) {
      console.log(error);
      return false;
    }
  };


  export const deleteClubService = async (req, res) => {
    const {clubID}=req.params
    try {
      const usersInDeletedClub = await Club.findByIdAndDelete({ _id:clubID, } )
      if (!usersInDeletedClub) {
        return res
          .status(401)
          .json({
            success: false,
            message: "club service  not found so cant be deleted",
        });
        
    }
    res.status(201).json({success:true, message:'club deleted successfully'})

    } catch (error) {
      
    }
  }


  //joing and populating a format style of the the club service
  export const joinClubService = async (req, res) => {
    try {
      // Update the user document to add the club to their list of clubs
      let user = await User.findByIdAndUpdate(
        { _id: req.user }, // Find the user by their ID
        { $addToSet: { clubs: req.params.clubID } }, // Add the club to the "clubs" array (if it's not already there)
        { new: true, runValidators: true} // Return the updated user document
      ).populate({ path: "clubs", select: "name description" });
  
      // Update the club document to add the user to their list of members
      await Club.findByIdAndUpdate(
        { _id: req.params.clubID }, // Find the club by its ID
        { $addToSet: { members: req.user } }, // Add the user to the "members" array (if they are not already a member)
        { new: true ,runValidators: true} // Return the updated club document
      );
   
      // Return the updated user object with populated clubs
      return user;
    } catch (error) {
     console.log(error);
      return Error()
    }
  };
  