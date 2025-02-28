import express from 'express';
import multer from 'multer';

import { 
    uploadStudyMaterial, 
    getAllStudyMaterials, 
    getStudyMaterialById, 
    updateStudyMaterial, 
    deleteStudyMaterial,
    searchStudyMaterials
} from '../Controller/studymaterial.controller.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('file'), uploadStudyMaterial);
router.get('/', getAllStudyMaterials);
router.get('/search', searchStudyMaterials);
router.get('/:id', getStudyMaterialById);
router.put('/:id', upload.single('file'), updateStudyMaterial);
router.delete('/:id', deleteStudyMaterial);

export default router;