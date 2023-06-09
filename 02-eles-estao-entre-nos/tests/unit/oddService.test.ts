import { oddService } from "../../src/services/oddService";
import { areaFiftyOneRepository } from "../../src/repositories/areaFiftyOneRepository";
import { jest } from "@jest/globals";
import { secretService } from "../../src/_secret_/secretService";

describe("isReallyOdd test suite", () => {
  it("should be odd number", () => {
    const oddNumber = 3;
    jest.spyOn(secretService, "isOdd").mockReturnValue(true);
    const result = oddService.isReallyOdd(oddNumber);
    expect(result).toBe("maybe not, who knows?");
  });


  it("should not be odd number", () => {
    const evenNumber = 2;
    jest.spyOn(secretService, "isOdd").mockReturnValue(false);
    const result = oddService.isReallyOdd(evenNumber);
    expect(result).toBe("Im not sure...");
  });
});

describe("listOVNIS test suite", () => {
  // Usando promise
  it("should return ovni", () => {
    const ovnis = [
      {
        id: 1,
        relatedBy: 2,
        geoLat: 123.124,
        geoLon: 12415.213,
      }
    ];
    jest.spyOn(areaFiftyOneRepository, "listOVNIS").mockImplementationOnce((): any => {
      return [ ...ovnis ];
    });
    const promise = oddService.listOVNIS();
    expect(promise).resolves.toEqual([ ...ovnis ]);
  });

  // Usando async await
  it("should return an ovni array", async () => {
    const expectedResult = [];
    jest.spyOn(areaFiftyOneRepository, "listOVNIS").mockResolvedValue(expectedResult);
    const result = await oddService.listOVNIS();
    expect(result).toEqual(expectedResult);
  });
});