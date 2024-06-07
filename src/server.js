const fastify = require('fastify')({
    logger: true
});

const healthRoutes = require('./routes/healthRoutes');
const investmentRoutes = require('./routes/investmentRoutes');

fastify.register(healthRoutes);
fastify.register(investmentRoutes);

fastify.setErrorHandler(function (error, request, reply) {
    if (error instanceof ResponseError) {
        reply.status(error.statusCode).send({ error: error.message });
    } else {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
});

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
