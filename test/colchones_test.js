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

    // Registro
    describe("GET /", () => {
        
        it("should return all colchones", async() => {

            const colchones = []
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
            expect(res.body).to.have.property("colchones")
            expect(res.body.colchones).to.be.an('array').that.contains.something.like(colchones[0]);
        })
    });

    // Editar
    describe("PUT /:id", () => {

        const auth = {}
        before(loginUser(auth))
        
        it("should update the existing colchon and return 200", async() => {
            const colchones = []
            for (let i = 0; i < 10; i++) {
                colchones.push({
                    name: faker.lorem.words(3),
                    description: faker.commerce.productName(),
                    price: faker.commerce.price(100,500),
                    image: faker.image.image()
                })
                
            }
            const {acknowledged, insertedIds} =  await Colchon.insertMany(colchones)          
            

            const res = await request(app).put("/apiv1/colchones/" + insertedIds[0]).send({
                email: email,
                password: password
            }).set('Authorization', 'bearer ' + auth.token);
            
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("token")
            expect(res.body).to.have.property("user")
            expect(res.body.user).to.have.property("_id")
        })
    });


    async function  loginUser  (auth) {
        const user = new User({
            email: faker.internet.email(),
            password: faker.internet.password(8)
        })
        await user.save()

        const res = await request(app)
                        .post("/apiv1/users/login").send({
            email: user.email,
            password: user.password
        });
        expect(res.status).to.equal(200)
        auth.token = res.body.token
        
    }
    
})