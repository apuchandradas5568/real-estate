import express from "express"

const app = express()

app.use('/api/test', (req,res) =>{
    res.send("Welcome to the test API")
})


app.listen(8080, ()=>{
    console.log("server is running on port 8080");
})