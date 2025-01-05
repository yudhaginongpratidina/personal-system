import express from "express";
const router = express.Router();

import { GET_ALL_USER, DELETE_USER_BY_ID, DELETE_MANY_USER } from "./users.service.js";

router.get("/", async (req, res, next) => {
    try {
        const response = await GET_ALL_USER()
        return res.status(200).json({
            message: "users fetched successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

router.post("/delete-many", async (req, res, next) => {
    try {
        const response = await DELETE_MANY_USER(req.body.ids)
        return res.status(200).json({
            message: "users deleted successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const response = await DELETE_USER_BY_ID(req.params.id)
        return res.status(200).json({
            message: "user deleted successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

export default router