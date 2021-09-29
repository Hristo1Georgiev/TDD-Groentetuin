//
// Functions with environment factors.
// Get yield for plant.
const getYieldForPlant = (crop, environmentFactors) => {
    if (!environmentFactors || (environmentFactors.sun === "medium" || environmentFactors.wind === "medium")) {
        return crop.yield;
    }
    if (environmentFactors.sun && environmentFactors.wind) {
        if (environmentFactors.sun) {
            if (environmentFactors.sun === "low") {
           sunFactors = crop.factors.sun.low
            } else if (environmentFactors.sun === "high") {
                sunFactors = crop.factors.sun.high
            } 
        }
        if (environmentFactors.wind) {
            if (environmentFactors.wind === "low") {
                windFactors = crop.factors.wind.low
            } else if (environmentFactors.wind === "high") {
                windFactors = crop.factors.wind.high
            }
        }
        return ((crop.yield * sunFactors) / 100) + ((crop.yield * windFactors) / 100) + crop.yield;
    }
    if (environmentFactors.sun) {
        if (environmentFactors.sun === "low") {
            totalFactors = crop.factors.sun.low
        } else if (environmentFactors.sun === "high") {
            totalFactors = crop.factors.sun.high
        }
        return ((crop.yield * totalFactors) / 100) + crop.yield;
    } 
    if (environmentFactors.wind) {
        if (environmentFactors.wind === "low") {
            totalFactors = crop.factors.wind.low
        } else if (environmentFactors.wind === "high") {
            totalFactors = crop.factors.wind.high
        }
        return ((crop.yield * totalFactors) / 100) + crop.yield;
    };
};

// Get yield for crop.
const getYieldForCrop = (input, environmentFactors) => {
    if (!environmentFactors || input.numCrops === 0) {
        return input.numCrops * input.crop.yield;
    }
    return input.numCrops * getYieldForPlant(input.crop, environmentFactors);
};

// Get total yield with multiple crops.
const getTotalYield = ({ crops }, environmentFactors) => {
    const arrayYield = crops.map(crop => getYieldForCrop(crop, environmentFactors));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalYield = arrayYield.reduce(reducer);

    return totalYield;
};

// Get costs for crop.
const getCostsForCrop= (input)=> input.numCrops;

// Revenue for crop.
const getRevenueForCrop = (input) => getYieldForCrop(input);

// Profit for crop.
const getProfitForCrop= (input)=>{
     return getRevenueForCrop(input) - getCostsForCrop(input)
}

// Total profit with multiple crops.
const getTotalProfit = crop => crop.crops.reduce((sum, item) => {
        return sum + getProfitForCrop(item)},0);



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};