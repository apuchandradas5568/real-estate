import express from "express"
import { admin, users } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router  = express.Router()

router.get('/user', verifyToken, users)
router.get('/admin', admin)



export default router;