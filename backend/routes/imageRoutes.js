const express = require("express");

const router = express.Router();

const images = [];

router.get("/", (req, res) => {
    res.json(images);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const image = images.find((image) => image.id === id);

    if (!image) {
        return res.status(404).json({
            message: "Image not found"
        });
    }

    res.json(image);
});

router.post("/", (req, res) => {
    const image = {
        id: images.length + 1,
        title: req.body.title,
        filename: req.body.filename
    };

    images.push(image);

    res.status(201).json(image);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const imageIndex = images.findIndex((image) => image.id === id);

    if (imageIndex === -1) {
        return res.status(404).json({
            message: "Image not found"
        });
    }

    images.splice(imageIndex, 1);

    res.json({
        message: "Image deleted"
    });
});

module.exports = router;
