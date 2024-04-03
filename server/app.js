import express from "express"
import postRoutes from "./routes/post_routes.js"
import userRoutes from "./routes/user_routes.js";
import authRoutes from "./routes/auth_routes.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/users',  userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)


app.listen(8080, ()=>{
    console.log("server is running on port 8080");
})