import express from 'express';
import multer from 'multer';

import {
    uploadstudyMaterial,
    getAllstudyMaterials,
    getstudyMaterialById,
    updatestudyMaterial,
    deletestudyMaterial, 
    searchstudyMaterials
} from "../Controller/studymaterial.controller.js";


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('file'), uploadstudyMaterial);
router.get('/', getAllstudyMaterials);
router.get('/search', searchstudyMaterials);
router.get('/:id', getstudyMaterialById);
router.put('/:id', upload.single('file'), updatestudyMaterial);
router.delete('/:id', deletestudyMaterial);

export default router;