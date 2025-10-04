import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';

@Resolver('Airport')
export class AirportResolver {
    constructor(private readonly prisma: PrismaService) { }
    @Query()
    async airports(@Args('search') search?: string) {
        if (!search || search.trim() === '') {
            return this.prisma.airport.findMany({
                take: 50,
            });
        }

        const searchTerm = search.trim().toUpperCase();
        const isIataLength = searchTerm.length === 3;

        const where = search ? {
            OR: [
                { name: { contains: searchTerm, } },
                { city: { contains: searchTerm, } },
                { country: { contains: searchTerm, } },
                ...(isIataLength
                    ? [{ iata: { equals: search.toUpperCase() } }]
                    : [{ iata: { contains: search } }]),
            ],
        } : {};

        return this.prisma.airport.findMany({
            where,
            take: 50,
        });
    }

    @Query()
    async airportsCount(@Args({ name: 'search', type: () => String, nullable: true }) search?: string) {
        if (!search || search.trim() === '') {
            return this.prisma.airport.count();
        }

        const searchTerm = search.trim().toUpperCase();
        const isIataLength = searchTerm.length === 3;

        const where = {
            OR: [
                { name: { contains: searchTerm, } },
                { city: { contains: searchTerm, } },
                { country: { contains: searchTerm, } },
                ...(isIataLength
                    ? [{ iata: { equals: search.toUpperCase() } }]
                    : [{ iata: { contains: search } }]),
            ],
        };

        return this.prisma.airport.count({
            where,
        });
    }
}