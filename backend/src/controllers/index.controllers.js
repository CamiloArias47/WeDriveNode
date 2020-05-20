const {Pool} = require('pg');


const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'root',
    database:'wedrive',
    port:'5432'
})

const getUsers = async (req,res) => {
    const response = await pool.query('select * from users');
    res.status(200).json(response.rows);
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { mail,
            name,
            lastname,
            trust,
            active,
            administrator,
            picture } = req.body;

    const response = await pool.query('update users set mail = $1, name = $2, lastname = $3, trust = $4, active = $5, administrator = $6, picture = $7', [
        mail,
        name,
        lastname,
        trust,
        active,
        administrator,
        picture]);

    res.json('User udated successfully');
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('update users set active = false');
    res.json(`User ${id} deleted`);
}


const getCameras = async (req, res) => {
    const response = await pool.query('select * from camera');
    res.status(200).json(response.rows);
}

const getActiveCameras = async (req,res) => {
    const response = await pool.query('select * from camerasAprobed');
    res.status(200).json(response.rows);
}

const updateCamera = async (req, res) => {
    const id = parseInt(req.params.id);
    const { vel,
        picture,
        coment,
        aproved,
        userId,
        adminId,
        created,} = req.body;

    const response = await pool.query('update camera set vel = $1, picture = $2, comment = $3, aproved = $4, userId = $5, adminId = $6, created = $7 where id = $8', 
                                        [vel,picture,coment,aproved,userId,adminId,created, id]);

    res.json('User udated successfully');
}

const createCamera = async (req, res) => {
    const {vel, picture, coment, aproved, userId, adminId,created } = req.body;
    const response = await pool.query('INSERT INTO camera (vel,picture, coment, aproved, userId, adminId, created) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                                                          [vel, picture, coment, aproved, userId, adminId,created ]);
    res.json({
        message: 'camera Added successfully',
        body: {
            user: response
        }
    })
};

const getStations = async (req,res) => {
    const response = await pool.query('select * from stations s inner join prices p on p.stationId = s.id')
    res.status(200).json(response.rows);
}

const savePricesCombustibles = async combustible => {
    const {stationId, gas, price} = combustible;
    const response = await pool.query('insert into prices (stationId, combustibleId, price) values ($1,$2,$3)',
                                                           [stationId, gas, price])
}

const saveStations = async (req, res) => {
    const {name,picture,coment,aproved,userId,adminId,created, gas} = req.body;
    const response = await pool.query('insert into stations (name,picture,coment,aproved,userId,adminId,created) values ($1,$2,$3,$4,$5,$6,$7)',
                                                            [name,picture,coment,aproved,userId,adminId,created])
    gas.forEach(elem => {
        savePricesCombustibles({stationId:response.id, gas:elem.gas, price:elem.price})
    });

    res.status(200).json('station added')
}

const updateStation = async (req, res) => {
    const id = parseInt(req.params.id);
    const {name,picture,coment,aproved,userId,adminId,created} = req.body;
    const response = await pool.query('update stations set name = $1, picture = $2, coment = $3, aproved = $4, userId = $5, adminId = $6, created = $7',
                                                           [name,picture,coment,aproved,userId,adminId,created])

    res.status(200).json('station updated')
}

const login = async (req, res) =>{
    const {username, password} = req.body
    const user = await pool.query('select * from users where mail = $1 and pass = $2');
    if(user.rows.length > 0){
        res.status(200).json(user.rows);
    }
    else{
        res.status(400).json('wrong credentials')
    }
}
module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    getCameras,
    getActiveCameras,
    updateCamera,
    createCamera,
    getStations,
    saveStations,
    updateStation,
    login
}