'use strict';

const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../lib/error')

const Somier = require('../../models/Somier');

const auth = require('../../middleware/auth')


router.get('/', [
    query('limit').optional().isNumeric().withMessage('limit es un número'),
    query('skip').optional().isNumeric().withMessage('skip es un número')
], async (req, res) => {
    try {
        validationResult(req).throw();
        const limit = parseInt(req.query.limit); //Number(str)
        const skip = parseInt(req.query.skip);

        let somieres = await Somier.find({}).limit(limit).skip(skip).exec()
        return res.send(somieres)
    } catch (error) {
        next(error)
    }
    
});



router.put('/:id', auth, async (req, res) => {
    let somierId = req.params.id
    try {

        const somier = await Somier.findOneAndUpdate(somierId, req.body, { new: true })
        res.send({ somier })
    } catch (error) {
        next(error)
    }
})



module.exports = router;
