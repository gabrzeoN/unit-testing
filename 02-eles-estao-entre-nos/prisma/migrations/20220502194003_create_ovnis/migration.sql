-- CreateTable
CREATE TABLE "ovnis" (
    "id" SERIAL NOT NULL,
    "relatedBy" INTEGER NOT NULL,
    "geoLat" DOUBLE PRECISION NOT NULL,
    "geoLon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ovnis_pkey" PRIMARY KEY ("id")
);
