// Schema untuk validasi response POST create user

export default {
    type: "object",
    properties: {
        name: { type: "string" },
        job: { type: "string" },
        id: { type: "string" },
        createdAt: { type: "string" }
    },
    required: ["name", "job", "id", "createdAt"]
}
