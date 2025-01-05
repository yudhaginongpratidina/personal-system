import { count_email_is_same, register, login } from "./auth.repository.js";
import ResponseError from "../../helper/response-error.js";
import bcrypt from "bcrypt";

export const REGISTER = async (email, password) => {
    const email_count = await count_email_is_same(email)
    if (email_count > 0) { throw new ResponseError(400, "Email already registered")}

    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt)

    const response = await register(email, password_hash)
    return response
}

export const LOGIN = async (email, password) => {
    const response = await login(email)
    if (!response) { throw new ResponseError(400, "Email not registered")}

    const isPasswordValid = await bcrypt.compare(password, response.password)
    if (!isPasswordValid) { throw new ResponseError(400, "Password is invalid")}
    
    return response
}