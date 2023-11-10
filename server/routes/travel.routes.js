const travelsController = require('../controllers/travel.controller');

module.exports = (app) => {
    app.get('/api/travel/all', travelsController.getAllTravels);
    app.post('/api/travel/create', travelsController.createTravel);
    app.get('/api/travel/:id', travelsController.getOne);
    app.delete('/api/travel/:id', travelsController.delete);
    app.patch('/api/travel/:id', travelsController.update);
}