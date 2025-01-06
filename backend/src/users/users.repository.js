import prisma from "../../config/prisma.js";

export const get_all_user = async () => {
    const response = await prisma.user.findMany({
        select: {
            id: true,
            full_name : true || null,
            email: true,
            role: true
        }
    })
    return response
}

export const get_user_by_id = async (id) => {
    const response = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    return response
}

export const get_user_by_email = async (email) => {
    const response = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return response
}

export const create_user = async (data) => {
    const response = await prisma.user.create({
        data: {
            full_name: data.full_name,
            email: data.email,
            password: data.password
        },
        select: {
            id: true,
            full_name : true || null,
            email: true,
            role: true,
            createdAt: true
        }
    })
    return response
}

export const delete_user_by_id = async (id) => {
    const response = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    return response
}

export const delete_many_user = async (ids) => {
    const response = await prisma.user.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })
    return response
}