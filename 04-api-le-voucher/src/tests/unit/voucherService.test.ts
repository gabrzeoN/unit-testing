import voucherService from "services/voucherService";
import voucherRepository from "repositories/voucherRepository";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe("createVoucher test suite", () => {
  it("should throw error on create voucher when it already exist", () => {
    const code = "unique code";
    const discount = 20;
    const voucher = {
      id: 1,
      code,
      discount,
      used: false
    };
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce((): any => {
      return { ...voucher };
    });
    jest.spyOn(voucherRepository, "createVoucher");
    const promise = voucherService.createVoucher(code, discount);
    expect(promise).rejects.toHaveProperty("message");
    expect(promise).rejects.toHaveProperty("type");
    expect(voucherRepository.createVoucher).not.toBeCalled();
  });

  it("should create voucher when passing non existent code and discount", async () => {
    const code = "unique code";
    const discount = 20;
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce(() => undefined);
    jest.spyOn(voucherRepository, "createVoucher").mockImplementationOnce(() => undefined);
    await voucherService.createVoucher(code, discount);
    expect(voucherRepository.createVoucher).toBeCalled();
  });
});

describe("applyVoucher test suite", () => {
  it("should throw error when not finding voucher", () => {
    const code = "unique code";
    const amount = 30;
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce((): any => undefined);
    const promise = voucherService.applyVoucher(code, amount);
    expect(promise).rejects.toHaveProperty("message");
    expect(promise).rejects.toHaveProperty("type");
  });

  it("should not apply voucher on amount under 100", () => {
    const code = "unique code";
    const amount = 30;
    const voucher = {
      id: 1,
      code,
      discount: amount,
      used: false
    };
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce((): any => voucher);
    jest.spyOn(voucherRepository, "useVoucher").mockImplementationOnce((): any => undefined);
    const promise = voucherService.applyVoucher(code, amount);
    expect(promise).resolves.toHaveProperty("amount", amount);
    expect(promise).resolves.toHaveProperty("finalAmount", amount);
    expect(promise).resolves.toHaveProperty("applied", false);
  });

  it("should apply voucher on amount over 100", () => {
    const code = "unique code";
    const amount = 100;
    const voucher = {
      id: 1,
      code,
      discount: amount,
      used: false
    };
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce((): any => voucher);
    jest.spyOn(voucherRepository, "useVoucher").mockImplementationOnce((): any => undefined);
    const promise = voucherService.applyVoucher(code, amount);
    expect(promise).resolves.toHaveProperty("amount", amount);
    expect(promise).resolves.toHaveProperty("applied", true);
  });
});