const nextId = (investments)=> {
    const greatestId = investments.reduce((acc, investment) => {
        if (investment.id > acc) {
            acc = investment.id;
        }
        return acc;
    }, 0);

    return greatestId + 1;
}

function isInvestmentValid({ name, minValue, tax, time }) {
    return name && minValue && tax && time;
}

const copyProperties = (source, target)=> {
    target.name = source.name;
    target.minValue = source.minValue;
    target.tax = source.tax;
    target.time = source.time;
}

const clone = (investment)=>{
    const {id, name, minValue, tax, time} = investment;
    return new Investment(id, name, minValue, tax, time);
}

module.exports = { 
    nextId,
    copyProperties,
    clone
 }