import request from "supertest";
import prisma from "../../config/prisma.js";
import dotenv from "dotenv";

dotenv.config();
const baseUrl = `${process.env.APP_URL}:${process.env.APP_PORT}/api`;

class AuthTest {
    static async delete(){
        await prisma.user.deleteMany();
    }
}

beforeAll(async () => { await AuthTest.delete(); });
afterAll(async () => { await AuthTest.delete(); });

describe("Test input validation for user registration", () => {
    it("if email is empty should throw error", async () => {
        const response = await request(baseUrl).post("/auth/register").send({})
        expect(response.body[0].path[0]).toBe("email")
        expect(response.body[0].message).toBe("Required")
    })

    it("if email is invalid should throw error", async () => {
        const response = await request(baseUrl).post("/auth/register").send({ email: "invalid_email" })
        expect(response.body[0].path[0]).toBe("email")
        expect(response.body[0].message).toBe("E-Mail is invalid")
    })

    it("if password is empty should throw error", async () => {
        const response = await request(baseUrl).post("/auth/register").send({ email: "user@gmail.com" })
        expect(response.body[0].path[0]).toBe("password")
        expect(response.body[0].message).toBe("Required")
    })

    it("if confirm password is empty should throw error", async () => {
        const response = await request(baseUrl).post("/auth/register").send({ email: "user@gmail.com", password: "user@gmail.com" })
        expect(response.body[0].path[0]).toBe("confirm_password")
        expect(response.body[0].message).toBe("Required")
    })
    
    it("if password and confirm password do not match should throw error", async () => {
        const response = await request(baseUrl).post("/auth/register").send({ email: "user@gmail.com", password: "user@gmail.com", confirm_password: "user1@gmail.com" })
        expect(response.body[0].path[0]).toBe("confirm_password")
        expect(response.body[0].message).toBe("Passwords do not match")
    })
});

describe("Test register user", () => {
    it("should register user", async () => {
        const response = await request(baseUrl).post("/auth/register").send({ email: "user@gmail.com", password: "user@gmail.com", confirm_password: "user@gmail.com" })
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("user registered successfully")
        expect(response.body.data.email).toBe("user@gmail.com")
        expect(response.body.data.password).toBeDefined()
        expect(response.body.data.createdAt).toBeDefined()
    })

    it("should throw error if email is already registered", async () => {
        const response = await request(baseUrl).post("/auth/register").send({ email: "user@gmail.com", password: "user@gmail.com", confirm_password: "user@gmail.com" })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Email already registered")
    })
})

describe("Test input validation for user login", () => {
    it("if email is empty should throw error", async () => {
        const response = await request(baseUrl).post("/auth/login").send({})
        expect(response.body[0].path[0]).toBe("email")
        expect(response.body[0].message).toBe("Required")
    })

    it("if email is invalid should throw error", async () => {
        const response = await request(baseUrl).post("/auth/login").send({ email: "invalid_email" })
        expect(response.body[0].path[0]).toBe("email")
        expect(response.body[0].message).toBe("E-Mail is invalid")
    })

    it("if password is empty should throw error", async () => {
        const response = await request(baseUrl).post("/auth/login").send({ email: "user@gmail.com" })
        expect(response.body[0].path[0]).toBe("password")
        expect(response.body[0].message).toBe("Required")
    })
})


describe("Test login user", () => {
    it("should throw error if email is not registered", async () => {
        const response = await request(baseUrl).post("/auth/login").send({ email: "user1@gmail.com", password: "user@gmail.com" })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Email not registered")
    })

    it("should throw error if password is invalid", async () => {
        const response = await request(baseUrl).post("/auth/login").send({ email: "user@gmail.com", password: "user1@gmail.com" })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Password is invalid")
    })

    it("should login user", async () => {
        const response = await request(baseUrl).post("/auth/login").send({ email: "user@gmail.com", password: "user@gmail.com" })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("user logged in successfully")
        expect(response.body.data.email).toBe("user@gmail.com")
        expect(response.body.data.password).toBeDefined()
        expect(response.body.data.role).toBeDefined()
    })
})