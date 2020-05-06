'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const EmailCtrl = require('../../lib/mailCtrl');
const { ErrorHandler } = require('../../lib/error')

const User = require('../../models/User');

const auth = require('../../middleware/auth')

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

        res.json({ user: clean(user), token: token })
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
        const token = await user.generateAuthToken()

        return res.json({user: clean(user), token: token  })

    } catch (err) {       
        
        next(err);
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
 * @api {post} /resetpassword usuario
 */
router.post('/resetpassword', [
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

router.get('/me', auth, async (req, res) => {
    // View logged in user profile
    res.send({ success: true, result: { user: clean(req.user) } })
})

router.post('/users/me/logout', auth, async (req, res) => {
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

router.post('/users/me/logoutall', auth, async (req, res) => {
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
