const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM images ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch images"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "SELECT * FROM images WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Image not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch image"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, filename } = req.body;

        if (!title || !filename) {
            return res.status(400).json({
                message: "title and filename are required"
            });
        }

        const result = await pool.query(
            "INSERT INTO images (title, filename) VALUES ($1, $2) RETURNING *",
            [title, filename]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create image"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const result = await pool.query(
            "DELETE FROM images WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Image not found"
            });
        }

        res.json({
            message: "Image deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete image"
        });
    }
});

module.exports = router;