const {Router} = require('express');
const router = Router();

const { getUsers, updateUser } = require('../controllers/index.controllers')

router.get('/users', getUsers);
router.put('/user/:id', updateUser)

module.exports = router;