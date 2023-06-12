const express = require("express");
const router = express.Router();
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrlr = require('../../controllers/auth');

router.post('/register', validateBody(schemas.registerSchema), ctrlr.register);
router.post('/login', validateBody(schemas.loginSchema), ctrlr.login);
router.get('/current', authenticate, ctrlr.getCurrent);
router.post('/logout', authenticate, ctrlr.logout);
router.patch('/', authenticate, validateBody(schemas.updateUserSubcriptionSchema), ctrlr.updateById);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlr.updateAvatar);
router.get('/verify/:verificationToken', ctrlr.verifyEmail);
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrlr.resendVeryficationEmail);

module.exports = router;