'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const EmailCtrl = require('../../lib/mailCtrl');

const User = require('../../models/User');


/**
 * @api {post} /users Registrar usuario
 */
router.post('/', [
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

/**
 * @api {post} /login usuario
 */
router.post('/login', [
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
        
        return res.json({ success: true, result: { user: clean(user), token : token } })
    } catch (err) {
        return res.json(err)
    }
});

/**
 * @api {post} /resetpassword usuario
 */
router.post('/passwordrecover', [
  body('email').isEmail().withMessage('The email must be valid')

], async (req, res, next) => {
  

  try {
      validationResult(req).throw();
      const { email } = req.body

      const user = await User.findOne({ email} ).exec();
      
      if (!user) {
        return res.send({success: false, error: 'Email is invalid!'})
      }

      const recovery_token = await user.generateRecoveryToken()
      EmailCtrl.sendEmail(email, recovery_token);
      
      return res.json({ success: true })
  } catch (err) {
      return res.json(new Error(err))
  }
});

/**
 * @api {post} /resetpassword usuario
 */
router.post('/resetpassword', [
  body('password', 'La clave debe ser de al menos 7 carácteres ')
        .isLength({ min: 7 })

], async (req, res, next) => {
  

  try {
      validationResult(req).throw();
      const { email } = req.body

      const user = await User.findOne({ email} ).exec();
      
      if (!user) {
        return res.send({success: false, error: 'Email is invalid!'})
      }

      const token = await user.generateAuthToken()
      
      return res.json({ success: true, result: { user: clean(user), token : token } })
  } catch (err) {
      return res.json(new Error(err))
  }
});


function clean(user){   
    var cleaned = user.toObject(); // convertir a objeto js normal

    delete cleaned.password;
    delete cleaned.__v;
    delete cleaned.tokens;
    delete cleaned.recovery_token;
    
    return cleaned;
}


function sendMail(user) {

}

module.exports = router;
