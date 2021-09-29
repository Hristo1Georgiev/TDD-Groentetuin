const { 
    getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,

} = require("./farm");

// Tests without environment factors.
// Yield for plant.
describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };
    const apples = {
        name: "apples",
        yield: 5,
    };

    test("Get yield for plant without environment factors - corn", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
    test("Get yield for for plant no env. factors - apples", () => {
        expect(getYieldForPlant(apples)).toBe(5)
    })
});

// Yield for crop.
describe("getYieldForCrop", () => {
    test("Get yield for crop - corn", () => {
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
    test("Get yield for crop - apples", () => {
        const apples = {
            name: "apples",
            yield: 5,
        };
        const input = {
            crop: apples,
            numCrops: 5,
        };
    expect(getYieldForCrop(input)).toBe(25)
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
        const apples = {
            name: "apples",
            yield: 5,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
            { crop: apples, numCrops: 5},
        ];
    expect(getTotalYield({ crops })).toBe(48);
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
    const apples = {
            name: "apples",
            yield: 5,
    };
    test("Calculate the costs for one crop - corn", ()=> {
        const input = {
            crop: corn,
            numCrops: 10,
        };
    expect(getCostsForCrop( input)).toBe(10);
    });
    test("Calculate the costs for one crop - apples", ()=> {
        const input = {
            crop: apples,
            numCrops: 12,
        };
    expect(getCostsForCrop( input)).toBe(12);
    });
});

// Ravenue for crop.
describe("getRevenueForCrop", () => {
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };
    test("Get revenue for crop - pumpkin", () => {
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };
    expect(getRevenueForCrop(input)).toBe(40);
    });
        const apples = {
        name: "apples",
        yield: 7,
    };
    test("Get revenue for crop", () => {
        const input = {
            crop: apples,
            numCrops: 10,
        };
    expect(getRevenueForCrop(input)).toBe(70);
    });
});

// Profit for crop.
describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };
     const apples = {
        name: "apples",
        yield: 7,
    };
    test("Get profit for crop - corn", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };
    expect(getProfitForCrop(input)).toBe(20);
    });
    test("Get profit for crop - pumpkin", () => {
        const input = {
            crop: pumpkin,
            numCrops: 10,
        };
    expect(getProfitForCrop(input)).toBe(30);
    });
    test("Get profit for crop", () => {
        const input = {
            crop: apples,
            numCrops: 10,
        };
    expect(getProfitForCrop(input)).toBe(60);
    });
});

// Total profit with multiple crops.
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
        const apples = {
            name: "apples",
            yield: 7,
    };
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 10 },
            { crop: apples, numCrops: 10}
        ];
    expect(getTotalProfit({ crops })).toBe(110);
    });
});

describe("getYieldForPlant with environment", () => {
        const corn = {
        name: "corn",
        yield: 3,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
        },
        };
        const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 70,
                medium: 0,
                high: 20,
            },
        },
        }; 
        const apples = {
        name: "apples",
        yield: 7,
        factors: {
            sun: {
                low: -30,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 70,
                medium: 0,
                high: -10,
            },
        },
        };  
// Tests corn with factors.
    test("Get yield for corn with low sun", () => {
        const environmentFactors = {
            sun: "low",
        };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(1.5);
    });
    test("Get yield for corn with high sun", () => {
        const environmentFactors = {
            sun: "high",
        };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(4.5);
    });
// Tests pumpkin with factors.
    test("Get yield for pumpkin with low wind", () => {
        const environmentFactors = {
            wind: "low",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(6.8);
    });

    test("Get yield for pumpkin with high wind", () => {
        const environmentFactors = {
            wind: "high",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(4.8);
    });

    test("Get yield for pumpkin with low sun", () => {
        const environmentFactors = {
            sun: "low",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(2);
    });

    test("Get yield for pumpkin with high sun", () => {
        const environmentFactors = {
            sun: "high",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(6);
    });

    test("Get yield for pumpkin with high sun and low wind", () => {
        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(8.8);
    });

    test("Get yield for pumpkin with high wind and low sun", () => {
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(2.8);
    });

    test("Get yield for pumpkin with low sun and low wind", () => {
        const environmentFactors = {
            sun: "low",
            wind: "low",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(4.8);
    });

    test("Get yield for pumpkin with high wind and high sun", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(6.8);
    });
// Tests yeld for apples with factors.
    test("Get yield for apples with low wind", () => {
        const environmentFactors = {
            wind: "low",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(11.9);
    });

    test("Get yield for apples with high wind", () => {
        const environmentFactors = {
            wind: "high",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(6.3);
    });

    test("Get yield for apples with low sun", () => {
        const environmentFactors = {
            sun: "low",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(4.9);
    });

    test("Get yield for apples with high sun", () => {
        const environmentFactors = {
            sun: "high",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(10.5);
    });

    test("Get yield for apples with high sun and low wind", () => {
        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(15.4);
    });

    test("Get yield for apples with high wind and low sun", () => {
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(4.2);
    });

    test("Get yield for apples with low sun and low wind", () => {
        const environmentFactors = {
            sun: "low",
            wind: "low",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(9.8);
    });

    test("Get yield for apples with high wind and high sun", () => {
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };
    expect(getYieldForPlant(apples, environmentFactors)).toBe(9.8);
    });
});

// Tests getYieldForCrop with enviroment factors.
describe("getYieldForCrop with environment", () => {
        const corn = {
        name: "corn",
        yield: 3,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
        },
        };
        const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 70,
                medium: 0,
                high: 20,
            },
            },
        }; 
        const apples = {
        name: "apples",
        yield: 7,
        factors: {
            sun: {
                low: -30,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 70,
                medium: 0,
                high: -10,
            },
            },
        };  
    test("Get yield for crop, with high wind and high sun", () => {
            const input = {
            crop: apples,
            numCrops: 10,
            };
            const environmentFactors = {
            wind: "high",
            sun: "high",
            };
    expect(getYieldForCrop(input, environmentFactors)).toBe(98);
    });


    test("Get yield for apples with low and low wind sun", () => {
        const input = {
            crop: apples,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "low",
            wind: "low",
        };
    expect(getYieldForCrop(input, environmentFactors)).toBe(98);
    });

    test("Get yield for crop, with high sun and low wind", () => {
        const input = {
            crop: apples,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            wind:"low",
        };
    expect(getYieldForCrop(input, environmentFactors)).toBe(154);
    });

    test("Get yield for apples with low sun high wind ", () => {
        const input = {
            crop: apples,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(42);
    });
});

// Get total yield with enviromet factors
describe("getTotalYield with environment factors", () => {
        const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factors: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 70,
                medium: 0,
                high: 20,
            },
            },
        }; 
        const apples = {
        name: "apples",
        yield: 7,
        factors: {
            sun: {
                low: -30,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 70,
                medium: 0,
                high: -10,
            },
            }
        };  

    test("Get total yield crops, with high sun and high wind", () => {
        const crops = [
            { crop: pumpkin, numCrops: 10 },
            { crop: apples, numCrops: 10}
        ];
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };
    expect(getTotalYield({crops}, environmentFactors)).toBe(166);
    });

    test("Get total yield crops, with low sun and low wind", () => {
        const crops = [
            { crop: pumpkin, numCrops: 10 },
            { crop: apples, numCrops: 10}
        ];
        const environmentFactors = {
            sun: "low",
            wind: "low",
        };
    expect(getTotalYield({crops}, environmentFactors)).toBe(146);
    });
});

