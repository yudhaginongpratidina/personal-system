import request from "supertest";
import prisma from "../../config/prisma.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt"

dotenv.config();
const baseUrl = `${process.env.APP_URL}:${process.env.APP_PORT}/api`;

class UserTest {


    static async create(){
        await prisma.user.createMany({
            data: [
                {
                    email: "guest@gmail.com",
                    password: bcrypt.hashSync("guest@gmail.com", 10),
                    role: "guest"
                },
                {
                    email: "admin@gmail.com",
                    password: bcrypt.hashSync("admin@gmail.com", 10),
                    role: "admin"
                },
                {
                    email: "user@gmail.com",
                    password: bcrypt.hashSync("user@gmail.com", 10),
                    role: "guest"
                },
                {
                    email: "user1@gmail.com",
                    password: bcrypt.hashSync("user1@gmail.com", 10),
                    role: "guest"
                }
            ]
        })
    }

    static async delete(){
        await prisma.user.deleteMany();
    }
}


beforeAll(async () => { await UserTest.create(); });
afterAll(async () => { await UserTest.delete(); });

describe("Test validation for create user", () => {
    it("if full name is empty should throw error", async () => {
        const response = await request(baseUrl).post("/users").send({})
        expect(response.body[0].path[0]).toBe("full_name")
        expect(response.body[0].message).toBe("Required")
    })

    it("if email is empty should throw error", async () => {
        const response = await request(baseUrl).post("/users").send({ full_name: "user test 1" })
        expect(response.body[0].path[0]).toBe("email")
        expect(response.body[0].message).toBe("Required")
    })

    it("if email is invalid should throw error", async () => {
        const response = await request(baseUrl).post("/users").send({ full_name: "user test 1", email: "invalid_email" })
        expect(response.body[0].path[0]).toBe("email")
        expect(response.body[0].message).toBe("E-Mail is invalid")
    })

    it("if password is empty should throw error", async () => {
        const response = await request(baseUrl).post("/users").send({ full_name: "user test 1", email: "user_test@gmail.com" })
        expect(response.body[0].path[0]).toBe("password")
        expect(response.body[0].message).toBe("Required")
    })

    it("if confirm password is empty should throw error", async () => {
        const response = await request(baseUrl).post("/users").send({ full_name: "user test 1", email: "user_test@gmail.com", password: "user_test@gmail.com" })
        expect(response.body[0].path[0]).toBe("confirm_password")
        expect(response.body[0].message).toBe("Required")
    })
})

describe("Test create user", () => {

    it("should throw error if email is already registered", async () => {
        const response = await request(baseUrl).post("/users").send({ full_name: "guest", email: "guest@gmail.com", password: "guest@gmail.com", confirm_password: "guest@gmail.com" })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Email already registered")
    })

    it("should create user", async () => {
        const response = await request(baseUrl).post("/users").send({ full_name: "user test 1", email: "user_test@gmail.com", password: "user_test@gmail.com", confirm_password: "user_test@gmail.com" })
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("user created successfully")
    })
})

describe("Test get all users", () => {
    it("should get all users", async () => {
        const response = await request(baseUrl).get("/users").send({})
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("users fetched successfully")
    })
})

describe("Test delete user", () => {

    it("should throw error if user not found", async () => {
        const response = await request(baseUrl).delete("/users/11013").send({})
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("User not found")
    })

    it("should delete user", async () => {
        const getAllUserResponse = await request(baseUrl).get("/users").send({})
        const id = getAllUserResponse.body.data[0].id
        const response = await request(baseUrl).delete(`/users/${id}`).send({})
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("user deleted successfully")
    })
})

describe("Test delete many users", () => {
    it("should delete many users", async () => {
        const getAllUserResponse = await request(baseUrl).get("/users").send({})
        const ids = getAllUserResponse.body.data.map((user) => user.id)
        const response = await request(baseUrl).post("/users/delete-many").send({ ids })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("users deleted successfully")
    })
});