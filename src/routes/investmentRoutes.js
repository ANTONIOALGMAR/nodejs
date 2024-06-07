const investmentController = require('../controllers/investmentController');

async function routes(fastify, options) {
    fastify.get('/investments', investmentController.findAll);
    fastify.get('/investments/:id', investmentController.findById);
    fastify.post('/investments', investmentController.save);
    fastify.put('/investments/:id', investmentController.update);
    fastify.delete('/investments/:id', investmentController.deleteById);
}

module.exports = routes;
