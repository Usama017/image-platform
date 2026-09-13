const express = require("express");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Image Platform Backend");
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP"
    });
});

app.use("/images", imageRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});