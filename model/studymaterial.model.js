import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
name :{ type: String, required: true },
format:{ type: String, required: true },
url:{ type: String, required: true },
tech:{ type: String, required: true },
author:{ type: String, required: true },
course:{ type: String, required: true },
year:{ type: String, required: true },
type:{ type: String, required: true },

},{timestamps: true});

const studyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
export default studyMaterial;