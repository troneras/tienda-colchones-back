const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const User = require('../models/User');
const faker = require('faker')

let user 
let email = faker.internet.email()
let password  =faker.internet.password(8)

describe("apiv1/users", () => {
    beforeEach(async () => {
        await User.deleteMany({})
    });

    // Registro
    describe("POST /", () => {
        
        it("should register an user when the request body is valid", async() => {
            const res = await request(app).post("/apiv1/users").send({
                email: email,
                password: password
            });
            
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("token")
            expect(res.body).to.have.property("user")
            expect(res.body.user).to.have.property("_id")
        })
    });

    // Login
    describe("POST /login", () => {
        
        it("should login the user and return the auth token", async() => {

            const user = new User({
                email: email,
                password: password
            })
            await user.save()

            const res = await request(app).post("/apiv1/users/login").send({
                email: email,
                password: password
            });
            
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("token")
            expect(res.body).to.have.property("user")
            expect(res.body.user).to.have.property("_id")
        })
    });
    
})