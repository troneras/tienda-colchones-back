'use strict';

const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../lib/error')

const Colchon = require('../../models/Colchon');

const auth = require('../../middleware/auth')


router.get('/', [
    query('limit').optional().isNumeric().withMessage('limit es un número'),
    query('skip').optional().isNumeric().withMessage('skip es un número')
], async (req, res) => {
    try {
        validationResult(req).throw();
        const limit = parseInt(req.query.limit); //Number(str)
        const skip = parseInt(req.query.skip);

        let colchones = await Colchon.find({}).limit(limit).skip(skip).exec()
        return res.send(colchones)
    } catch (error) {
        next(error)
    }
    
});



router.put('/:id', auth, async (req, res) => {
    let colchonId = req.params.id
    try {

        const colchon = await Colchon.findOneAndUpdate(colchonId, req.body, { new: true })
        res.send({ colchon })
    } catch (error) {
        next(error)
    }
})



module.exports = router;
