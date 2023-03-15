import { prisma } from "../database.js";

async function listOVNIS() {
  const result = await prisma.ovni.findMany();
  return result;
}

export const areaFiftyOneRepository = {
  listOVNIS,
};
