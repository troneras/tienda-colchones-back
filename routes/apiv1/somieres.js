'use strict';

const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../lib/error')

const Somier = require('../../models/Somier');

const auth = require('../../middleware/auth')


/**
 * @api {get} /somieres Listar somieres
 * @apiDescription Permite realizar una búsqueda filtrada y paginada de los somieres disponibles.
 * Es necesario que el usuario esté autorizado en la api para mostrar los resultados.
 * 
 * @apiName GetSomieres
 * @apiGroup Somier
 * @apiVersion 1.0.0
 * 
 * @apiParam  {Number} [limit]  Optional Limitar el número de somieres devueltos
 * @apiParam  {Number} [skip]   Optional Saltar somieres
 * 
 * @apiSuccess {Object[]} somieres  Lista con los somieres disponibles
 */
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


/**
 * @api {put} /somieres Actualizar somier
 * @apiDescription Permite actualizar el somier
 * Es necesario que el usuario esté autorizado en la api para realizar ésta acción.
 * 
 * @apiName UpdateSomieres
 * @apiGroup Somier
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Token jwt del usuario 
 * @apiHeaderExample {json} Authorization:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY"
 *     }
 * 
 * @apiParam  {String} [name]
 * @apiParam  {String} [description]
 * @apiParam  {String} [image]
 * @apiParam  {String} [price]
 * 
 * @apiSuccess {Object} somier  El somier actualizado
 */
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
