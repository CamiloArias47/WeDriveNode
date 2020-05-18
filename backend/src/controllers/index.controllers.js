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

module.exports = {
    getUsers,
    updateUser
}