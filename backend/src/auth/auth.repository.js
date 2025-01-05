import prisma from "../../config/prisma.js";

export const count_email_is_same = async (email) => {
    const response = await prisma.user.count({
        where: {
            email: email
        }
    })

    return response
}

export const register = async (email, password) => {
    const response = await prisma.user.create({
        data: {
            email : email,
            password : password
        },
        select: {
            id: true,
            email: true,
            password: true,
            createdAt: true
        }
    })

    return response
}

export const login = async ( email ) => {
    const response = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            email: true,
            password: true,
            role: true,
        }
    })

    return response
}