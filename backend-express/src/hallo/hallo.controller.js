import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        return res.status(200).json({ message: "ok" })
    } catch (error) {
        next(error)
    }
})

export default router