import express from 'express';
import { registerInProgramController ,subscribedProgramsController ,  unsubscribedProgramsController ,allprogramsController 
} from '../controllers/parentController.js';
import  userAuth from '../middleware/authMiddleware.js'

const router  = express.Router()
 
router.post('/register-program' , userAuth, registerInProgramController  )
router.get('/subscribe-program' ,userAuth, subscribedProgramsController)
router.get('/unsubscribe-program' ,userAuth, unsubscribedProgramsController)
router.get('/all-program' ,userAuth, allprogramsController)

export default router
