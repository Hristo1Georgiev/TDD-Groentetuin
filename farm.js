// Tests are OK!
//Functions without environment factors.
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


// functions with environment factors
const getYieldForCropEnvFactors = (input, environmentFactors) => {
    if (!environmentFactors) {
        return input.numCrops * input.crop.yield;
    }else
    return input.numCrops * getYieldForPlant(input.crop, environmentFactors);
}

const getYieldForPlantWithFactors = (input, environmentFactors) => {
    const lowSun = 0.5
    const sunMedium = 1
    const highSun = 1.5

    const noWind = 1
    const windy = 0.7
    const storm = 0.4

    let resultSun;
    if (environmentFactors.sun === "low") {
      resultSun = input.yield * lowSun;
    } else if (environmentFactors.sun === "high") {
      resultSun = input.yield * highSun;
    } else {
      resultSun = input.yield;
    }

    let resultWindAndSun;
    if (environmentFactors.wind === "storm") {
        resultWindAndSun = resultSun * storm;
      } else if (environmentFactors.wind === "windy") {
        resultWindAndSun = resultSun * windy;
      } else {
        resultWindAndSun = resultSun * noWind;
      }
      let resultWindAndSunRounded = Math.round (resultWindAndSun*100) / 100
      return resultWindAndSunRounded

};


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForCropEnvFactors,
    getYieldForPlantWithFactors,
}