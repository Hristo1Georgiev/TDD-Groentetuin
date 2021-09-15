// First four tests are OK!
const getYieldForPlant = (crop) => {
        return crop.yield;
    };

const getYieldForCrop = (input) => {
        return input.numCrops * input.crop.yield;
};
    
const getTotalYield = ({ crops }) => {
    const plantsYield = crops.map(crop => getYieldForCrop(crop));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalYield = plantsYield.reduce(reducer);
    return totalYield;
};

const getCostsForCrop= ()=>{
};

const getRevenueForCrop= ()=>{

}
const getProfitForCrop= ()=>{

}
 const getTotalProfit= ()=>{

}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}