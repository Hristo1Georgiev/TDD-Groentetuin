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

const getCostsForCrop= (input)=> input.numCrops;

const getRevenueForCrop = (input) => getYieldForCrop(input);

const getProfitForCrop= (input)=>{
     return   getRevenueForCrop(input) - getCostsForCrop(input)
}


const getTotalProfit = crop => crop.crops.reduce((sum, item) => {
        return sum + getProfitForCrop(item)},0);

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}