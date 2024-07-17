import express from "express";
const ClubRoute = express.Router();


import{GetSingle,GetAll} from "../../Controller/ClubCruds/Club.getController.js"

import auth from "../../Authentication/UserAuth.js"

import { CreateController,createClubRequiredController} from "../../Controller/ClubCruds/Club.PostController.js"

import {JoinClubController,
    editClubController,deleteClubController }  from "../../Controller/ClubCruds/Club.putController.js"


ClubRoute.post("/createClub",auth,CreateController,createClubRequiredController,);

ClubRoute.get("/GetClubs",auth,GetAll);

ClubRoute.get("/get/:clubID",auth,GetSingle);

ClubRoute.patch("/update/:clubID",auth,editClubController);

ClubRoute.delete("/delete/:clubID",auth,deleteClubController);

ClubRoute.patch("/join/:clubID",auth,JoinClubController);




    








export default ClubRoute;