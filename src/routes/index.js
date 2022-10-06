const router = require('express').Router();

router.use('/',require('./users'));
router.use('/',require('./profile'));
router.use('/',require('./otp'));

module.exports = router;