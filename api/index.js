const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;
const db = require('./queries');


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors()) //cors setup for all hosts, should probably refine. 
app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and postgres API'})
})
app.get('/people', db.getPeople);
app.get('/people/:id', db.getPersonById);
app.get('/offers', db.getOffers);
app.get('/offers/:id', db.getOfferById);
app.post('/people', db.addPerson);
app.post('/offers', db.addOffer);
app.put('/people/:id', db.updatePerson);
app.put('/offers/:id', db.updateOffer);
app.delete('/people/:id', db.deletePerson);
app.delete('/offer/:id', db.deleteOffer);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})