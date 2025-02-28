import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
        projectUrl: { type: String, required: true }
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;