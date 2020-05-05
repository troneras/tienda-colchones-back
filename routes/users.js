'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


const User = require('../models/User');


/**
 * @api {post} /login usuario
 */
router.post('/', [
    body('email').isEmail().withMessage('The email must be valid'),
    body('password', 'Password needs to be min 7 characters long ')
        .isLength({ min: 7 })

], async (req, res, next) => {
    

    try {
        validationResult(req).throw();
        const { email, password } = req.body

        const user = await User.findByCredentials(email, password);
        
        if (!user) {
          return res.send({success: false, error: 'Login failed!'})
        }
        const token = await user.generateAuthToken()
        
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
