import express from "express";
const router = express.Router();

import { CREATE_PROJECT, GET_ALL_PROJECT, DELETE_PROJECT_BY_ID, DELETE_MANY_PROJECT } from "./projects.service.js";
import { createProjectSchema } from "./projects.validator.js";

router.get("/", async (req, res, next) => {
    try {
        const response = await GET_ALL_PROJECT()
        return res.status(200).json({
            message: "projects fetched successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const data = await createProjectSchema.parse(req.body)
        const response = await CREATE_PROJECT(data)
        return res.status(201).json({
            message: "project created successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

router.post("/delete-many", async (req, res, next) => {
    try {
        const response = await DELETE_MANY_PROJECT(req.body.ids)
        return res.status(200).json({
            message: "projects deleted successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const response = await DELETE_PROJECT_BY_ID(req.params.id)
        return res.status(200).json({
            message: "project deleted successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

export default router