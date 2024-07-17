import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import  connectDB from "./Config/database.js"
import UserRoute from "./Routes/AUTH/UsersRoute.js"
import  cloudinary from'cloudinary';
import  fileupload from'express-fileupload';
import ClubRoute from "./Routes/ClubRouters/ClubRoute.js"


const app = express();
const port = process.env.PORT || 9040;
// const UserRouter= require("./Routes/AUTH")

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_name,
  api_key: process.env.Cloud_api_key,
  api_secret: process.env.Cloud_api_secret,
});
app.use(fileupload({useTempFiles:true}))

   

app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

//Public Route

    
app.use('/api/v1',UserRoute)

//private Route 
app.use("/api/v1/clubs",ClubRoute);   


app.listen(port, () => {
    connectDB();
    console.log(`Server running on https://localhost:${port}`);
  });
   