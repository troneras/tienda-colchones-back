const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

const app = require('../app')
const Somier = require('../models/Somier');
const faker = require('faker')



describe("apiv1/somieres", () => {
    beforeEach(async () => {
        await Somier.deleteMany({})
    });

    // get all
    describe("GET /", () => {
        
        it("should return all somieres", async() => {

            let somieres = []
            for (let i = 0; i < 10; i++) {
                somieres.push({
                    name: faker.lorem.words(3),
                    description: faker.commerce.productName(),
                    price: faker.commerce.price(100,500),
                    image: faker.image.image()
                })
                
            }

            await Somier.insertMany(somieres)     
            

            const res = await request(app).get("/apiv1/somieres");
            
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
        })
    });


    // pagination
    describe("GET /:limit :skip ", () => {
        
        it("should return paginated somieres", async() => {

            let somieres = []
            for (let i = 0; i < 10; i++) {
                somieres.push({
                    name: faker.lorem.words(3),
                    description: faker.commerce.productName(),
                    price: faker.commerce.price(100,500),
                    image: faker.image.image()
                })
                
            }

            await Somier.insertMany(somieres)     
            
            const perPage = 3,
                  page = 3
            const res = await request(app).get("/apiv1/somieres").query({ limit: perPage, skip: perPage*page });
            
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array').that.has.lengthOf(1) // la última página solo tiene 1 
        })
    });

    // Editar
    describe("PUT /:id", () => {

        
        
        it("should update the existing Somier and return 200", async() => {
            let somieres = []
            for (let i = 0; i < 10; i++) {
                somieres.push({
                    name: faker.lorem.words(3),
                    description: faker.commerce.productName(),
                    price: faker.commerce.price(100,500),
                    image: faker.image.image()
                })
                
            }

            const inserted = await Somier.insertMany(somieres)  
                 
           const login = await request(app).post("/apiv1/users").send({
                email: faker.internet.email(),
                password: faker.internet.password(8)
            });
            expect(login.status).to.equal(200)
            const token = login.body.token
            
            
            let nuevoNombre = "NUEVO NOMBRE" 
            const res = await request(app).put("/apiv1/somieres/" + inserted[0]._id).send({
                name: nuevoNombre
            }).set('Authorization', 'Bearer ' + token);
            
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("somier").to.have.property("name",nuevoNombre)
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