const { extractEntities } = require("../src/extractEntities");

describe("extractEntities function", () => {
  // Function Tests
  it("should return an empty array for an empty string", async () => {
    const input = "";
    const expectedOutput = [];
    const result = await extractEntities(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle strings with special characters", async () => {
    const input = "McDonald's";

    const result = await extractEntities(input);
    expect(result).not.toHaveLength(0);
  });

  it("Query string should be incasesitive", async () => {
    const input = "MCDONald's";

    const result = await extractEntities(input);
    expect(result).not.toHaveLength(0);
  });

  // Unit tests
  it("should return one object with McDonald's brandName", async () => {
    const input = "McDonald's";
    const expectedOutput = [{ brand: { id: 1, name: "McDonald's" } }];

    const result = await extractEntities(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should return the combination of McDonald's BrandName and London City", async () => {
    const input = "McDonald's in London";
    const expectedOutput = [
      { brand: { id: 1, name: "McDonald's" } },
      { city: { id: 1, name: "London" } },
    ];
    const result = await extractEntities(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should return two objects in response", async () => {
    const input = "vegan sushi in London";
    const expectedOutput = [
      {
        brand: { id: 3, name: "Sushimania" },
        city: { id: 1, name: "London" },
        diet: { id: 1, name: "Vegan" },
      },
      {
        dish_type: { id: 1, name: "Sushi" },
        city: { id: 1, name: "London" },
        diet: { id: 1, name: "Vegan" },
      },
    ];
    const result = await extractEntities(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should return two separated objects in response", async () => {
    const input = "veg london";
    const expectedOutput = [
      {
        city: { id: 1, name: "London" },
        diet: { id: 1, name: "Vegan" },
      },
      {
        diet: { id: 2, name: "Vegetarian" },
        city: { id: 1, name: "London" },
      },
    ];
    const result = await extractEntities(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should return two separated objects in response", async () => {
    const input = "McDonald's in London or Manchester";
    const expectedOutput = [
      {
        brand: { id: 1, name: "McDonald's" },
        city: { id: 1, name: "London" },
      },
      {
        city: { id: 2, name: "Manchester" },
        brand: { id: 1, name: "McDonald's" },
      },
    ];
    const result = await extractEntities(input);
    expect(result).toEqual(expectedOutput);
  });
});
