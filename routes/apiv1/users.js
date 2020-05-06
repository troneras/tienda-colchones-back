'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const EmailCtrl = require('../../lib/mailCtrl');
const { ErrorHandler } = require('../../lib/error')

const User = require('../../models/User');

const auth = require('../../middleware/auth')



/**
 * @api {post} /usuarios Registrar usuario
 * @apiDescription Permite registrar un usuario
 * 
 * @apiName RegistrarUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} email        
 * @apiParam  {String} password     Al menos 7 caracteres
 * 
 * @apiSuccess {object} colchon- El colchon actualizado
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

        res.json({ user: clean(user), token: token })
    } catch (err) {
        res.json(err)
    }
});

/**
 * @api {post} /usuarios/login Login de usuario
 * @apiDescription Permite hacer login de un usuario y obtener el token de autentificación
 * 
 * @apiName LoginUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} email        
 * @apiParam  {String} password     Al menos 7 caracteres
 * 
 * @apiSuccess {object} user    El usuario
 * @apiSuccess {string} token   El token de Authentication
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
        const token = await user.generateAuthToken()

        return res.json({user: clean(user), token: token  })

    } catch (err) {       
        
        next(err);
    }
});

/**
 * @api {post} /usuarios/password-recovery Password Recovery
 * @apiDescription Permite al usuario recuperar su password. Se enviará un email a su dirección
 * Genera un token que guarda en el usuario de la bbdd para después comprobar si puede resetear la contraseña
 * 
 * @apiName PasswordRecoveryUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} email        
 * 
 * @apiSuccess {boolean} success    
 */
router.post('/password-recovery', [
    body('email').isEmail().withMessage('The email must be valid')

], async (req, res, next) => {


    try {
        validationResult(req).throw();
        const { email } = req.body

        const user = await User.findOne({ email }).exec();

        if (!user) {
            throw new ErrorHandler(404, 'No user found with this email' )
        }

        const recovery_token = await user.generateRecoveryToken()
        EmailCtrl.sendEmail(email, recovery_token);

        return res.json({ success: true })
    } catch (err) {
        next(err)
    }
});

/**
 * @api {post} /usuarios/reset-password Reset Password
 * @apiDescription Permite al usuario resetear su password. Debe incluír la nueva contraseña 
 * además del token recibido por email 
 * 
 * @apiName ResetPasswordUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} email        
 * @apiParam  {String} password     El nuevo password        
 * 
 * @apiSuccess {boolean} success    
 */
router.post('/reset-password', [
    body('email').isEmail().withMessage('The email must be valid'),
    body('password', 'La clave debe ser de al menos 7 carácteres ')
        .isLength({ min: 7 })

], async (req, res, next) => {


    try {
        validationResult(req).throw();
        const { email } = req.body

        const user = await User.findOne({ email }).exec();

        if (!user) {
            throw new ErrorHandler(404, 'No user found with this email' )
        }

        const token = await user.generateAuthToken()

        return res.json({ user: clean(user), token: token  })
    } catch (err) {
        next(err)
    }
});

/**
 * @api {get} /usuarios/me  Logged User
 * @apiDescription Permite al usuario recuperar su información. Es necesario estar logueado 
 * 
 * @apiName GetUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Token jwt del usuario 
 * @apiHeaderExample {json} Authorization:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY"
 *     }
 * 
 * @apiSuccess {Object} user    Información del usuario logueado    
*/
router.get('/me', auth, async (req, res) => {
    // View logged in user profile
    res.send( { user: clean(req.user) })
})


/**
 * @api {post} /usuarios/logout
 * @apiDescription Permite al usuario desconectar del dispositivo actual
 * 
 * @apiName LogoutUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Token jwt del usuario 
 * @apiHeaderExample {json} Authorization:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY"
 *     }
 * 
 * @apiSuccess {Boolean} success      
*/
router.post('/users/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({ success: true })
    } catch (error) {
        next(err)
    }
})

/**
 * @api {post} /usuarios/logout-all
 * @apiDescription Permite al usuario desconectar de todos los dispositivos en los que haya iniciado sesión
 * 
 * @apiName LogoutAllUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiHeader {String} Authorization Token jwt del usuario 
 * @apiHeaderExample {json} Authorization:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEzMTliYzE2ZDY3YmNkNTMwZDYxM2RkIiwiaWF0IjoxNTEzMjA1MjY2LCJleHAiOjE1MTMzNzgwNjZ9.EnA-ng5V_v5wmKk44zDKWTcdxhUP4FxONYNVbQnHWVY"
 *     }
 * 
 * @apiSuccess {Boolean} success      
*/
router.post('/users/logout-all', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send({ success: true })
    } catch (error) {
        next(err)
    }
})


function clean(user) {
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
