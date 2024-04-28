import express from "express"
import postRoutes from "./routes/post_routes.js"
import userRoutes from "./routes/user_routes.js";
import authRoutes from "./routes/auth_routes.js"
import testRoutes from "./routes/test.routes.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"

const app = express()

dotenv.config()

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json())
app.use(cookieParser())

app.use('/api/users',  userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/auth', authRoutes)
app.use("/api/test", testRoutes)


app.listen(8080, ()=>{
    console.log("server is running on port 8080");
})


// 3:52