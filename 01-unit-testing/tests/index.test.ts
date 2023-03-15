import { calculateTax } from "../src/index.js";

describe("calculate taxes suite", () => {
  it("should be free of tax", () => {
    const tax = calculateTax(generateValue(0, 2499));
    expect(tax).toBe(0);
  });

  it("should have 7,5% of tax", () => {
    const salary = generateValue(2500, 3199);
    const tax = calculateTax(salary);
    expect(tax).toBe(salary * 0.075);
  });

  it("should have 15% of tax", () => {
    const salary = generateValue(3200, 4249);
    const tax = calculateTax(salary);
    expect(tax).toBe(salary * 0.15);
  });

  it("should have 22,5% of tax", () => {
    const salary = generateValue(4250, 5299);
    const tax = calculateTax(salary);
    expect(tax).toBe(salary * 0.225);
  });

  it("should have 27,5% of tax", () => {
    const salary = generateValue(5300, Infinity);
    const tax = calculateTax(salary);
    expect(tax).toBe(salary * 0.275);
  });
});

function generateValue(min: number, max: number){
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("RANDOM: ", random);
  return random;
}