const healthController = require('../controllers/healthController');

module.exports = async (fastify) => {
    fastify.get('/health', healthController.healthCheck);
}