const connectToMongo = require("./db")
const express = require("express")


connectToMongo()
const app = express()
app.use(express.json());
const port = 5000

app.get("/", (req, res) => {
    res.send("Welcome to Index page")
})
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
})