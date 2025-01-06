import { create_project, get_all_project, get_project_by_id, delete_project_by_id, delete_many_project } from "./projects.repository.js";
import ResponseError from "../../helper/response-error.js";

export const CREATE_PROJECT = async (data) => {
    const response = await create_project(data)
    return response
}

export const GET_ALL_PROJECT = async () => {
    const response = await get_all_project()
    return response
}

export const DELETE_PROJECT_BY_ID = async (id) => {
    const project = await get_project_by_id(id)
    if (!project) { throw new ResponseError(400, "Project not found") }
    const response = await delete_project_by_id(id)
    return response
}

export const DELETE_MANY_PROJECT = async (ids) => {
    const response = await delete_many_project(ids)
    return response
}