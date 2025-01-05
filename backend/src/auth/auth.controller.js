import express from "express";
const router = express.Router();

import { REGISTER, LOGIN } from "./auth.service.js";
import { registerSchema, loginSchema } from "./auth.validator.js";

router.post("/register", async (req, res, next) => {
    try {
        const data = await registerSchema.parse(req.body)
        const response = await REGISTER(data.email, data.password)
        return res.status(201).json({
            message: "user registered successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})


router.post("/login", async (req, res, next) => {
    try {
        const data = await loginSchema.parse(req.body)
        const response = await LOGIN(data.email, data.password)
        return res.status(200).json({
            message: "user logged in successfully",
            data: response
        })
    } catch (error) {
        next(error)
    }
})

export default router