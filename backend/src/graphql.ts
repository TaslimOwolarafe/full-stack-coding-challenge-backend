
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    hello(): string | Promise<string>;
    getSeaport(id: number): Nullable<Seaport> | Promise<Nullable<Seaport>>;
    airports(search?: Nullable<string>): Airport[] | Promise<Airport[]>;
    airportsCount(search?: Nullable<string>): number | Promise<number>;
}

export interface Seaport {
    id: number;
    name: string;
    location?: Nullable<Location>;
}

export interface Location {
    city: string;
    countryAlpha2: string;
}

export interface Airport {
    id: number;
    name: string;
    iata: string;
    city: string;
    country: string;
}

type Nullable<T> = T | null;
