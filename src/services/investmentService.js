const ResponseError = require('../errors/responseError');
const Investment = require('../models/investment');
const {nextId, clone, copyProperties} = require('../utils/investmentUtils')

const investments = [
    new Investment(1, "CDB - Pós Fixado", 1000, 103.75, 30),
    new Investment(2, "CDB - Pós Fixado", 1000, 104.25, 60),
    new Investment(3, "CDB - Pós Fixado", 5000, 112, 180),
    new Investment(4, "Tesouro pré fixado 2025", 783.33, 13.10, 1080),
    new Investment(5, "Tesouro Selic 2025", 11868, 0.1, 1080)
];

const findAll = ({ name, minValue, maxValue, minTax, minTime } = {}) => {
    const investmentsFiltered = investments.filter((investment) => {
        let condition = true;

        if (name) condition &&= investment.name.startsWith(name);
        if (minValue) condition &&= investment.minValue >= minValue;
        if (maxValue) condition &&= investment.minValue < maxValue;
        if (minTax) condition &&= investment.tax >= minTax;
        if (minTime) condition &&= investment.time >= minTime;

        return condition;
    });
    return investmentsFiltered;
};

const findById = (id) => {
    const investment = investments.find((investment) => investment.id == id);
    if (investment) {
        return investment;
    } else {
        throw new ResponseError(404, 'Investment not found');
    }
};

const deleteById = (id) => {
    const index = investments.findIndex((investment) => investment.id == id);
    if (index >= 0) {
        investments.splice(index, 1);
    } else {
        throw new ResponseError(404, 'Investment not found');
    }
};

const save = ({ name, minValue, tax, time }) => {
    const id = nextId(investments);
    const investment = new Investment(id, name, minValue, tax, time);

    if (investment.isValid()) {
        investments.push(investment);
        return investment;
    } else {
        throw new ResponseError(400, 'All attributes must be defined');
    }
};

const updateById = (id, { name, minValue, tax, time }) => {
    const investment = investments.find((investment) => investment.id == id);
    
    if (!investment){
        throw new ResponseError(404, 'Investment not found.');
    }
    const copiedInvestment = clone(investment);
    copyProperties({ name, minValue, tax, time }, copiedInvestment);

    if (!copiedInvestment.isValid()){
        throw new ResponseError(400, 'All attributes must be defined');
    }
    
    copyProperties(copiedInvestment, investment);
    return investment;
}

module.exports = {
    save,
    findAll,
    findById,
    deleteById,
    updateById
};