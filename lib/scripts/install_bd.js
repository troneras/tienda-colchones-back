'use strict';

require('dotenv').config();

const faker = require('faker')
const request = require('supertest')
const app = require('../../app')
const User = require('../../models/User');
const Colchon = require('../../models/Colchon');
const Somier = require('../../models/Somier');


async function install() {
    try {
        await User.deleteMany({})
        await Colchon.deleteMany({})
        await Somier.deleteMany({})

        let email = "admin@example.com"
        let password = "password"

        await request(app).post("/apiv1/users").send({
            email: email,
            password: password
        });

        let somieres = []
        for (let i = 0; i < 10; i++) {
            somieres.push({
                name: faker.lorem.words(3),
                description: faker.commerce.productName(),
                price: faker.commerce.price(100.00, 500.00),
                image: faker.image.image()
            })

        }

        await Somier.insertMany(somieres)

        let colchones = []
        for (let i = 0; i < 10; i++) {
            colchones.push({
                name: faker.lorem.words(3),
                description: faker.commerce.productName(),
                price: faker.commerce.price(100.00, 500.00),
                image: faker.image.image()
            })

        }

        await Colchon.insertMany(colchones)
        process.exit()

    } catch (error) {
        // na
        console.log(error);
        
    }
}

install();
return;
