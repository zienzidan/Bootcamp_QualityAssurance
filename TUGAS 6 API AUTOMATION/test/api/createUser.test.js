import fetch from "node-fetch"
import { expect } from "chai"
import Ajv from "ajv"
import createUserSchema from "../schema/createUserSchema.js"
import dotenv from "dotenv"

dotenv.config()

describe("POST Create User API", function(){

    it("Should create new user successfully", async function(){

        // Data yang akan dikirim sebagai request body
        const newUser = {
            name: "Zidan",
            job: "QA Engineer"
        }

        // Kirim request POST
        const response = await fetch("https://reqres.in/api/users", {
            method: "POST", // method POST karena kita create data
            headers: {
                "Content-Type": "application/json", // wajib untuk kirim JSON
                "x-api-key": process.env.API_KEY
            },
            body: JSON.stringify(newUser) // ubah object menjadi string JSON
        })

        // Validasi status code harus 201 (created)
        expect(response.status).to.equal(201)

        // Ambil response body
        const data = await response.json()

        const ajv = new Ajv()
        const validate = ajv.compile(createUserSchema)
        const valid = validate(data)

        // Pastikan schema sesuai
        expect(valid).to.be.true

    })

})
