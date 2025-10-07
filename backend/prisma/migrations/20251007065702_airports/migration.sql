-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");
