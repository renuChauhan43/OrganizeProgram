import express from 'express';
import  multer  from "multer";

import userAuth from '../middleware/authMiddleware.js';
import {createProgramController ,getAllProgramController  ,updateProgramController ,deleteProgramController
} from '../controllers/organizationController.js'
// import { upload } from '../middleware/multermiddleware.js';

const router  = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);   
    }
  });
  
  export const upload = multer({storage})
  

router.post('/create-program',userAuth ,upload.single('image'),   createProgramController  )
router.get('/get-program' ,userAuth, getAllProgramController  )
router.patch('/update-program/:id',userAuth , updateProgramController  )
router.delete('/delete-program/:id',userAuth , deleteProgramController  )

export default router