import React, { useEffect, useState, useCallback } from "react";
import { NextPage } from "next";
import Link from "next/link";

import Layout from "../components/layout";
import useApiData from "../hooks/use-api-data";
import Airport from "../types/airport";

const Page: NextPage = () => {
  // const airports = useApiData<Airport[]>("/api/airports", []);
  const GRAPHQL_ENDPOINT = "http://localhost:3001/graphql";

  const [searchTerm, setSerchTerm] = useState("");
  const [airports, setAirports] = React.useState<Airport[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAirports = useCallback(async (search: string) => {
    setLoading(true);
    setError(null);

    const query = `
      query GetAirports($search: String) {
        airports(search: $search) {
          id
          name
          iata
          city
          country
        }
          airportsCount(search: $search)
      }
    `;

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { search: search || null },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      setAirports(result.data.airports);
      setTotalCount(result.data.airportsCount);
    } catch (error) {
      setError(error.message);
      setAirports([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchAirports(searchTerm);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, fetchAirports]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Code Challenge: Airports</h1>

      <h2 className="mt-10 text-xl font-semibold">All Airports</h2>

      <div className="bg-whitw rounded-lg shadow-lg p-6 mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, city, country, or IATA code..."
            value={searchTerm}
            onChange={(e) => setSerchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            <span>{loading ? "Loading..." : `${totalCount}`}</span>
          </div>
        </div>
      </div>

      {loading && <p>Loading airports...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && airports.length === 0 && (<p>No airports found. Try a different search term.</p>)}

      {
        !loading && !error && airports.length > 0 && (
          <div>
            {airports.map((airport) => (
              <Link
                className="flex items-center p-5 mt-5 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
                href={`/airports/${airport.iata.toLowerCase()}`}
                key={airport.iata}
              >
                <span>
                  {airport.name}, {airport.city}
                </span>
                <span className="ml-auto text-gray-500">{airport.country}</span>
              </Link>
            ))}
          </div>

        )
      }

    </Layout>
  );
};

export default Page;
