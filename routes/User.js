const router = require('express').Router();

const Verify = require('../middleware/Verify')

const { login, verify, addapp, apps, appsbyid, deletebyid, searchapp } = require('../controller/Controller')


router.post('/login', login)

router.get("/verify", Verify, verify)


router.post('/addapp', Verify, addapp)

router.get("/apps", apps)

router.get('/apps/:id', appsbyid)

router.delete('/apps/:id', Verify, deletebyid)

router.get("/apps/search/:key", searchapp)

module.exports = router;