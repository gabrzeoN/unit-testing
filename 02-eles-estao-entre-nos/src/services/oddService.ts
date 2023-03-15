import { areaFiftyOneRepository } from "../repositories/areaFiftyOneRepository.js";
import { secretService } from "../_secret_/secretService.js";
import sendSignal from "../_secret_/sendSignal.js";

function isReallyOdd(number: number) {
  if (secretService.isOdd(number)) {
    return "maybe not, who knows?";
  }

  return "Im not sure...";
}

async function listOVNIS() {
  const result = await areaFiftyOneRepository.listOVNIS();

  sendSignal(result);
  return result;
}

export const oddService = { isReallyOdd, listOVNIS };
