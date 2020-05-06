const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

const app = require('../app')
const Colchon = require('../models/Colchon');

const faker = require('faker')



describe("apiv1/colchones", () => {
    beforeEach(async () => {
        await Colchon.deleteMany({})
    });

    // get all
    describe("GET /", () => {
        
        it("should return all colchones", async() => {

            let colchones = []
            for (let i = 0; i < 10; i++) {
                colchones.push({
                    name: faker.lorem.words(3),
                    description: faker.commerce.productName(),
                    price: faker.commerce.price(100,500),
                    image: faker.image.image()
                })
                
            }

            await Colchon.insertMany(colchones)     
            

            const res = await request(app).get("/apiv1/colchones");
            
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
        })
    });


    // pagination
    describe("GET /:limit :skip ", () => {
        
        it("should return paginated colchones", async() => {

            let colchones = []
            for (let i = 0; i < 10; i++) {
                colchones.push({
                    name: faker.lorem.words(3),
                    description: faker.commerce.productName(),
                    price: faker.commerce.price(100,500),
                    image: faker.image.image()
                })
                
            }

            await Colchon.insertMany(colchones)     
            
            const perPage = 3,
                  page = 3
            const res = await request(app).get("/apiv1/colchones").query({ limit: perPage, skip: perPage*page });
            
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array').that.has.lengthOf(1) // la última página solo tiene 1 
        })
    });

    // Editar
    describe("PUT /:id", () => {

        
        
        it("should update the existing colchon and return 200", async() => {
            let colchones = []
            for (let i = 0; i < 10; i++) {
                colchones.push({
                    name: faker.lorem.words(3),
                    description: faker.commerce.productName(),
                    price: faker.commerce.price(100,500),
                    image: faker.image.image()
                })
                
            }

            const inserted = await Colchon.insertMany(colchones)  
                 
           const login = await request(app).post("/apiv1/users").send({
                email: faker.internet.email(),
                password: faker.internet.password(8)
            });
            expect(login.status).to.equal(200)
            const token = login.body.token
            
            
            let nuevoNombre = "NUEVO NOMBRE" 
            const res = await request(app).put("/apiv1/colchones/" + inserted[0]._id).send({
                name: nuevoNombre
            }).set('Authorization', 'Bearer ' + token);
            
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("colchon").to.have.property("name",nuevoNombre)
        })
    });


    async function  loginUser  () {

        const res = await request(app).post("/apiv1/users").send({
            email: faker.internet.email(),
            password: faker.internet.password(8)
        });
        
        expect(res.status).to.equal(200)
        return res.body.token
        
    }
    
})