import prisma from "../../config/prisma.js";

export const get_all_project = async () => {
    const response = await prisma.project.findMany()
    return response
}

export const get_project_by_id = async (id) => {
    const response = await prisma.project.findUnique({
        where: {
            id: Number(id)
        }
    })
    return response
}

export const create_project = async (data) => {
    const response = await prisma.project.create({
        data: {
            name: data.name,
            description: data.description,
            techstack: data.techstack,
            link_repository: data.link_repository
        },
        select: {
            id: true,
            name: true,
            description: true,
            techstack: true,
            link_repository: true,
            createdAt: true
        }
    })
    return response
}

export const delete_project_by_id = async (id) => {
    const response = await prisma.project.delete({
        where: {
            id: Number(id)
        }
    })
    return response
}

export const delete_many_project = async (ids) => {
    const response = await prisma.project.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })
    return response
}