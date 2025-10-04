import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface AirportData {
    name?: string;
    iata?: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
}

async function main() {
    const filePath = path.join(__dirname, '..', '..', 'frontend', 'data', 'airports.json');
    if (!fs.existsSync(filePath)) {
        throw new Error(`Airports JSON not found in: ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const airports: AirportData[] = JSON.parse(raw);


    const data = airports.map((a) => ({
        name: a.name || "",
        iata: (a.iata || "").toUpperCase(),
        city: a.city || "",
        country: a.country || "",
        latitude: a.latitude ?? null,
        longitude: a.longitude ?? null,
    }));

    console.log(`Seeding ${data.length} airports...`);

    await prisma.airport.createMany({
        data,
    })
}

main().catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
}); 