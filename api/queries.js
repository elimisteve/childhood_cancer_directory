const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'ccd',
  password: 'password',
  port: 5432,
})

const getPeople = (request, response) => {
    pool.query('SELECT * FROM person ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPersonById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(`SELECT * FROM person WHERE id = ${id}`, (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}

const getOffers = (request, response) => {
    pool.query('SELECT * FROM offer ORDER BY id ASC', (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

const getOfferById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM offer WHERE id = ${id}`, (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}

const addPerson = (request, response) => {
    const {firstname, lastname, email, password} = request.body;
    pool.query('INSERT INTO person (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)',[firstname, lastname, email, password], (error ,result) => {
        if (error){
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    }) 
}

const addOffer = (request, response) => {
    const {name, description} = request.body;
    pool.query('INSERT INTO offer (name, description)  VALUES($1, $2)',[name,description], (error, result) => {
        if(error){
            throw error
        }
        response.status(201).send(`Offer added with id ${result.insertId}`)
    })
}

const deletePerson = (request, response) => {
    console.log("REQ",request.params);
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM person WHERE id = $1', [id], (error, result) => {
        if(error){
            throw error
        }
        response.status(200).send(`User deleted with id: ${id}`)
    })
}

const deleteOffer = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM offer WHERE id = $1', [id], (error, result) => {
        if(error){
            throw error
        }
        response.status(200).send(`User deleted with id: ${id}`)
    })

}

const updatePerson = (request, response) => {
    const id = parseInt(request.params.id);
    const {firstname, lastname, email} = request.body;

    pool.query(
        'UPDATE person SET firstname = $1, lastname = $2, email = $3 WHERE id = $4',
         [firstname, lastname, email, id],
         (error, result) => {
             if (error){
                 throw error
             }
             response.status(200).send(`user modified with id: ${id}`)
         }
    )
}

const updateOffer = (request, response) => {
    const id = parseInt(request.params.id);
    const {name, description} = request.body;

    pool.query(
        'UPDATE offer SET name = $1, description = $2 WHERE id = $3',
         [name, description, id],
         (error, result) => {
             if (error){
                 throw error
             }
             response.status(200).send(`offer modified with id: ${id}`)
         }
    )
}




module.exports =  {getPeople, getPersonById, getOffers, getOfferById, addPerson, addOffer, deleteOffer, deletePerson, updatePerson, updateOffer,};