import { get_all_user, get_user_by_id, get_user_by_email, create_user, delete_user_by_id, delete_many_user } from "./users.repository.js";
import ResponseError from "../../helper/response-error.js";
import bcrypt from "bcrypt";

export const GET_ALL_USER = async () => {
    const response = await get_all_user()
    return response
}

export const CREATE_USER = async (data) => {

    const user = await get_user_by_email(data.email)
    if (user) { throw new ResponseError(400, "Email already registered") }

    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(data.password, salt)
    data.password = password_hash

    const response = await create_user(data)
    return response
}

export const DELETE_USER_BY_ID = async (id) => {

    const user = await get_user_by_id(id)
    if (!user) { throw new ResponseError(400, "User not found") }

    const response = await delete_user_by_id(id)
    return response
}

export const DELETE_MANY_USER = async (ids) => {
    const response = await delete_many_user(ids)
    return response
}