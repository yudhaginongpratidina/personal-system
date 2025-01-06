import request from "supertest";
import prisma from "../../config/prisma.js";
import dotenv from "dotenv";

dotenv.config();
const baseUrl = `${process.env.APP_URL}:${process.env.APP_PORT}/api`;

class ProjectTest {

    static async create() {
        await prisma.project.createMany({
            data: [
                {
                    name: "project",
                    description: "project description",
                    techstack: "techstack",
                    link_repository: "link_repository"
                },
                {
                    name: "project 2",
                    description: "project description 2",
                    techstack: "techstack 2",
                    link_repository: "link_repository 2"
                }
            ]
        })
    }

    static async delete() {
        await prisma.project.deleteMany();
    }
}

beforeAll(async () => {
    await ProjectTest.delete();
    await ProjectTest.create();
});
afterAll(async () => { await ProjectTest.delete(); });

describe("Test input validation for project creation", () => {
    it("if name is empty should throw error", async () => {
        const response = await request(baseUrl).post("/projects").send({})
        expect(response.body[0].path[0]).toBe("name")
        expect(response.body[0].message).toBe("Required")
    })

    it("if description is empty should throw error", async () => {
        const response = await request(baseUrl).post("/projects").send({ name: "project" })
        expect(response.body[0].path[0]).toBe("description")
        expect(response.body[0].message).toBe("Required")
    })

    it("if techstack is empty should throw error", async () => {
        const response = await request(baseUrl).post("/projects").send({ name: "project", description: "project description" })
        expect(response.body[0].path[0]).toBe("techstack")
        expect(response.body[0].message).toBe("Required")
    })


    it("if link_repository is empty should throw error", async () => {
        const response = await request(baseUrl).post("/projects").send({ name: "project", description: "project description", techstack: "techstack" })
        expect(response.body[0].path[0]).toBe("link_repository")
        expect(response.body[0].message).toBe("Required")
    })
})


describe("Test create project", () => {
    it("should create project", async () => {
        const response = await request(baseUrl).post("/projects").send({ name: "project", description: "project description", techstack: "techstack", link_repository: "link_repository" })
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("project created successfully")
        expect(response.body.data.name).toBe("project")
        expect(response.body.data.description).toBe("project description")
        expect(response.body.data.techstack).toBe("techstack")
        expect(response.body.data.link_repository).toBe("link_repository")
        expect(response.body.data.createdAt).toBeDefined()
    })
})


describe("Test get all projects", () => {
    it("should get all projects", async () => {
        const response = await request(baseUrl).get("/projects")
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("projects fetched successfully")
        expect(response.body.data).toBeDefined()
    })
})

describe("Test delete project by id", () => {

    it("should throw error if project not found", async () => {
        const response = await request(baseUrl).delete("/projects/10121")
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Project not found")
    })

    it("should delete project by id", async () => {
        const project = await prisma.project.findFirst()
        const response = await request(baseUrl).delete(`/projects/${project.id}`)
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("project deleted successfully")
    })
})

describe("Test delete many projects", () => {
    it("should delete many projects", async () => {
        const project = await prisma.project.findMany()
        const ids = project.map((project) => project.id)
        const response = await request(baseUrl).post("/projects/delete-many").send({ ids })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("projects deleted successfully")
    })
})