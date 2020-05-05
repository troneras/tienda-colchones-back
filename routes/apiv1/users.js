'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


const User = require('../../models/User');


/**
 * @api {post} /users Registrar usuario
 */
router.post('/register', [
    body('email').isEmail().withMessage('El email debe ser válido'),
    body('password', 'La clave debe ser de al menos 7 carácteres ')
        .isLength({ min: 7 })

], async (req, res, next) => {
    

    try {
        validationResult(req).throw();
        const user = new User(req.body)
        await user.save()
        
        const token = await user.generateAuthToken()
        const user2 = clean(user)
        
        res.json({ success: true, result: { user: clean(user), token : token } })
    } catch (err) {
        res.json(err)
    }
});


function clean(user){   
    var cleaned = user.toObject(); // convertir a objeto js normal

    delete cleaned.password;
    delete cleaned.__v;
    delete cleaned.tokens;
   
    return cleaned;
}

module.exports = router;
