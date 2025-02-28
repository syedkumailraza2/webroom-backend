import express from 'express';
import multer from 'multer';

import { 
    uploadStudyMaterial,
    getAllStudyMaterial, 
    updateStudyMaterial,
    deletestudyMaterial,
    searchStudyMaterial,
    getstudyMaterialById
} from '../controller/studymaterial.controller.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('file'), uploadStudyMaterial);
router.get('/', getAllStudyMaterial);
router.get('/search', searchStudyMaterial);
router.get('/:id', getstudyMaterialById);
router.put('/:id', upload.single('file'), updateStudyMaterial);
router.delete('/:id', deletestudyMaterial);

export default router;