const {Router} = require('express');
const router = Router();

const { getUsers, updateUser, deleteUser,
        getCameras, getActiveCameras, updateCamera, createCamera,
        getStations, saveStations, updateStation,
        login
      } = require('../controllers/index.controllers')

router.get('/users', getUsers);
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.get('/cameras',getCameras)
router.get('/aprovedcameras',getActiveCameras)
router.put('/camera/:id', updateCamera)
router.post('/camera',createCamera)
router.get('/stations',getStations)
router.post('/station', saveStations)
router.put('station/:id', updateStation)
router.post('login',login)

module.exports = router;