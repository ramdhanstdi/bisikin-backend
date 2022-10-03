const router = require('express').Router();

router.use('/',require('./users'));
router.use('/',require('./profile'));

module.exports = router;