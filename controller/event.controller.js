import Event from "../model/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addEvent = ()=>{
    async (req, res) => {
        try {
            //get user input and validate
            const { name, date, description,register } = req.body
    
            if (!name) {
                res.status(400).json({ message: "Name is Required" });
            }
    
            if (!date) {
                res.status(400).json({ message: "Date is Required" });
            }
            if (!description) {
                res.status(400).json({ message: "Description is Required" });
            }
            if (!register) {
                res.status(400).json({ message: "registration link  is Required" });
            }
    
            //add file to cloudinary
            const posterBuff = req.files?.poster?.[0]?.buffer;
            if (!posterBuff) {
                return res.status(400).json({ message: "Poster is required" });
            }
    
            const poster = await uploadOnCloudinary(posterBuff,'image')
            if (!poster) {
                return res.status(400).json({ message: "Failed to upload poster" });
            }

            const brochureBuff = req.files?.brochure?.[0]?.buffer;
            if (!brochureBuff) {
                return res.status(400).json({ message: "Brochure is required" });
            }
    
            const brochure = await uploadOnCloudinary(brochureBuff,'pdf')
            if (!brochure) {
                return res.status(400).json({ message: "Failed to upload Brochure" });
            }
            
    
            //save data to db and give response
            const event = await Event({
                name,
                date,
                description,
                register: register,
                poster:poster.secure_url,
                brochure:brochure.secure_url
            })
    
            await event.save();
    
            console.log(event);
            res.status(200).json({
                message: "Event added successfully!",
                event
            });
    
        } catch (error) {
            console.log(`Error while creating an Event: ${error}`);
    
        }
    }
}