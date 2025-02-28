import express from "express";
import { addEvent } from "../controller/event.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const eventRoutes = express.Router();

eventRoutes.post("/add-event", upload.fields([{ name: "poster", maxCount: 1 }, { name: "broucher", maxCount: 1 }]), addEvent);


export default eventRoutes;
