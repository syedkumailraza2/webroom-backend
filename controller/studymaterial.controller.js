import studyMaterial from "../Model/studymaterial.model";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Upload study material
export const uploadstudyMaterial = async (req, res) => {
    try {
        console.log("🔹 Request Body:", req.body);
        console.log("🔹 Received File:", req.file);

        const { name, format, tech, author, course, year, type } = req.body;

        if (!name || !format || !tech || !author || !course || !year || !type || !req.file) {
            return res.status(400).json({ message: "All fields (name, format, tech, author, course, year, type, file) are required!" });
        }

        const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.v2.uploader.upload(fileBase64, { resource_type: "auto" });

        const newMaterial = new studyMaterial({
            name,
            format,
            url: result.secure_url,
            tech,
            author,
            course,
            year,
            type
        });

        await newMaterial.save();
        res.status(201).json({ message: "Study material uploaded successfully", data: newMaterial });

    } catch (error) {
        console.error("❌ Error uploading file:", error);
        res.status(500).json({ message: "Error uploading study material", error: error.message });
    }
};

// Get all study materials
export const getAllstudyMaterials = async (req, res) => {
    try {
        const materials = await studyMaterial.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving study materials", error: error.message });
    }
};

// Get a single study material by ID
export const getstudyMaterialById = async (req, res) => {
    try {
        const material = await studyMaterial.findById(req.params.id);
        if (!material) return res.status(404).json({ message: "Study material not found" });

        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving study material", error: error.message });
    }
};

// Update study material (including file replacement)
export const updatestudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const existingMaterial = await studyMaterial.findById(id);
        if (!existingMaterial) return res.status(404).json({ message: "Study material not found" });

        let fileUrl = existingMaterial.url;

        if (req.file) {
            const oldFilePublicId = fileUrl.split('/').pop().split('.')[0];
            await cloudinary.v2.uploader.destroy(oldFilePublicId, { resource_type: "auto" });

            const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            const result = await cloudinary.v2.uploader.upload(fileBase64, { resource_type: "auto" });

            fileUrl = result.secure_url;
        }

        const updatedMaterial = await studyMaterial.findByIdAndUpdate(id, { ...req.body, url: fileUrl }, { new: true });

        res.status(200).json({ message: "Study material updated successfully", data: updatedMaterial });
    } catch (error) {
        res.status(500).json({ message: "Error updating study material", error: error.message });
    }
};

// Delete study material (and remove file from Cloudinary)
export const deletestudyMaterial = async (req, res) => {
    try {
        const { id } = req.params;

        const material = await studyMaterial.findById(id);
        if (!material) return res.status(404).json({ message: "Study material not found" });

        const fileUrl = material.url;
        const publicId = fileUrl.split('/').slice(-1)[0].split('.')[0];

        await cloudinary.v2.uploader.destroy(publicId, { resource_type: "auto" });
        await studyMaterial.findByIdAndDelete(id);

        res.status(200).json({ message: "Study material deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting study material", error: error.message });
    }
};

// Search study materials
export const searchstudyMaterials = async (req, res) => {
    try {
        const { query, format, year } = req.query;

        const searchCriteria = {};
        if (query) {
            searchCriteria.$or = [
                { name: { $regex: query, $options: "i" } },
                { tech: { $regex: query, $options: "i" } },
                { author: { $regex: query, $options: "i" } },
                { course: { $regex: query, $options: "i" } },
                { year: { $regex: query, $options: "i" } },
                { type: { $regex: query, $options: "i" } }
            ];
        }
        if (format) searchCriteria.format = format;
        if (year) searchCriteria.year = year;

        const materials = await studyMaterial.find(searchCriteria);
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error searching study materials", error: error.message });
    }
};
