// Import module untuk melakukan API request
import fetch from "node-fetch"

// Import assertion library
import { expect } from "chai"

// Import AJV untuk JSON Schema validation
import Ajv from "ajv"

import dotenv from "dotenv"

// Import schema yang akan digunakan untuk validasi
import getUserSchema from "../schema/getUserSchema.js"

dotenv.config()

describe("GET User API", function(){

    it("Should get single user successfully", async function(){

        // Kirim request GET ke endpoint
        // Header x-api-key wajib karena reqres sekarang butuh API key
        const response = await fetch("https://reqres.in/api/users/2", {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY
            }
        })

        // Validasi status code harus 200 (success)
        expect(response.status).to.equal(200)

        // Ambil response body dalam bentuk JSON
        const data = await response.json()

        // Buat instance AJV
        const ajv = new Ajv()

        // Compile schema menjadi function validator
        const validate = ajv.compile(getUserSchema)

        // Validasi response dengan schema
        const valid = validate(data)

        // Pastikan hasil validasi adalah true
        expect(valid).to.be.true

    })

})
