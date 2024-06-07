const investmentService = require('../services/investmentService');
const ResponseError = require('../errors/responseError');

const findAll = (request, reply) => {
    try {
        const investmentsFiltered = investmentService.findAll(request.query);
        reply.send(investmentsFiltered);
    } catch (error) {
        reply.status(error.statusCode || 500).send({ message: error.message });
    }
};

const findById = (request, reply) => {
    try {
        const { id } = request.params;
        const investment = investmentService.findById(id);
        reply.send(investment);
    } catch (error) {
        reply.status(error.statusCode || 500).send({ message: error.message });
    }
};

const deleteById = (request, reply) => {
    try {
        const { id } = request.params;
        investmentService.deleteById(id);
        reply.status(204).send();
    } catch (error) {
        reply.status(error.statusCode || 500).send({ message: error.message });
    }
};

const save = (request, reply) => {
    try {
        const investment = investmentService.save(request.body);
        reply.status(201).send(investment);
    } catch (error) {
        reply.status(error.statusCode || 500).send({ message: error.message });
    }
};

const update = (request, reply) => {
    try {
        const { id } = request.params;
        const updatedInvestment = investmentService.updateById(id, request.body);
        reply.send({ message: 'Investment updated successfully', updatedInvestment });
    } catch (error) {
        reply.status(error.statusCode || 500).send({ message: error.message });
    }
};

module.exports = {
    findAll,
    findById,
    deleteById,
    save,
    update
};