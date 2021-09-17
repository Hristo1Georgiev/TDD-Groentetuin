const { 
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForCropEnvFactors,
    getYieldForPlantWithFactors,
} = require("./farm");


// Tests without environment factors.
// Yield for plant.
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant without environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

// Yield for crop.
describe("getYieldForCrop", () => {
    test("Get yield for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

// Total yield.
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

// Total yield with 0 amount.
    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

// Costs for crop.
describe("getCostsForCrop", ()=>{
        const corn = {
        name: "corn",
        yield: 3,
    };

    test("Calculate the costs for one crop", ()=> {
                const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostsForCrop( input)).toBe(10);
    })
})

// Ravenue for crop.
describe("getRevenueForCrop", () => {
 
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    test("Get revenue for crop", () => {
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };
        expect(getRevenueForCrop(input)).toBe(40);
    })
});
describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    test("Get profit for crop", () => {
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };
        expect(getProfitForCrop(input)).toBe(30);
    });
});

// Total profit.
describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit({ crops })).toBe(16);
    });
});

//Tests with environment factors:

// Yield for crop
describe("getYieldForCropEnvFactors", () => {

    test("Yield for crop with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 10,
                medium: 0,
                high: -10,
              },
            },
          };
          const avocado = {
            name: "avocado",
            yield: 3,
            factors: {
              sun: {
                low: -20,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 0,
                medium: -30,
                high: -60,
              },
            },
          };
          const environmentFactors = {
            sun: "high",
            wind: "high",
            ground: "soft"
          };
        expect(getYieldForCropEnvFactors({crop: corn, numCrops: 10}, environmentFactors)).toBe(300);
        expect(getYieldForCropEnvFactors({crop: avocado, numCrops: 10}, environmentFactors)).toBe(30);
    });
});

