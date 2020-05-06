'use strict';

const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../lib/error')

const Colchon = require('../../models/Colchon');

const auth = require('../../middleware/auth')



/**
 * @api {get} /colchones Listar colchones
 * @apiDescription Permite realizar una búsqueda filtrada y paginada de los colchones disponibles.
 * Es necesario que el usuario esté autorizado en la api para mostrar los resultados.
 * 
 * @apiName GetColchones
 * @apiGroup Colchon
 * @apiVersion 1.0.0
 * 
 * @apiParam  {Number} [limit]  Optional Limitar el número de colchones devueltos
 * @apiParam  {Number} [skip]   Optional Saltar colchones
 * 
 * @apiSuccess {Object[]} colchones     Lista con los colchones disponibles
 */
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


/**
 * @api {put} /colchones Actualizar colchón
 * @apiDescription Permite actualizar el colchón
 * Es necesario que el usuario esté autorizado en la api para realizar ésta acción.
 * 
 * @apiName UpdateColchon
 * @apiGroup Colchon
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
 * @apiSuccess {object} colchon- El colchon actualizado
 */
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
