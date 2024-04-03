import express from "express"

const router  = express.Router()



router.get("/test", (req,res)=>{
    res.send("Testing route users")
} )


export default router