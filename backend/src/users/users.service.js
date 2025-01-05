import { get_all_user, get_user_by_id, delete_user_by_id, delete_many_user } from "./users.repository.js";
import ResponseError from "../../helper/response-error.js";

export const GET_ALL_USER = async () => {
    const response = await get_all_user()
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