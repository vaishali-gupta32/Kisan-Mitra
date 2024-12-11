'use client'

import { useState, useEffect } from 'react'
import { CropListing } from '../types'
import ListingCard from '../components/ListingCard'

interface Filters {
  cropType: string
  district: string
  state: string
}

export default function Marketplace() {
  const [listings, setListings] = useState<CropListing[]>([])
  const [filters, setFilters] = useState<Filters>({
    cropType: '',
    district: '',
    state: '',
  })

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    // In a real application, this would be an API call with filters
    const mockListings: CropListing[] = [
      { id: 1, cropName: 'Wheat', quantity: 1000, unit: 'kg', price: 500, farmerDistrict: 'District A', farmerState: 'State X' },
      { id: 2, cropName: 'Rice', quantity: 2000, unit: 'kg', price: 750, farmerDistrict: 'District B', farmerState: 'State Y' },
      { id: 3, cropName: 'Corn', quantity: 1500, unit: 'kg', price: 600, farmerDistrict: 'District C', farmerState: 'State Z' },
    ]
    setListings(mockListings)
  }

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters)
    // In a real application, you would call fetchListings with the new filters
  }

  const filteredListings = listings.filter(listing => 
    (!filters.cropType || listing.cropName === filters.cropType) &&
    (!filters.district || listing.farmerDistrict === filters.district) &&
    (!filters.state || listing.farmerState === filters.state)
  )

  return (
    <div 
      className="min-h-screen bg-cover bg-center text-black" // Added text-black here
      style={{ backgroundImage: "url('/resources/background4.jpeg')" }} 
    >
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <aside className="w-64 bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Crop Type</label>
                <select 
                  value={filters.cropType} 
                  onChange={(e) => applyFilters({ ...filters, cropType: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Corn">Corn</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">District</label>
                <select 
                  value={filters.district} 
                  onChange={(e) => applyFilters({ ...filters, district: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All</option>
                  <option value="District A">District A</option>
                  <option value="District B">District B</option>
                  <option value="District C">District C</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">State</label>
                <select 
                  value={filters.state} 
                  onChange={(e) => applyFilters({ ...filters, state: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All</option>
                  <option value="State X">State X</option>
                  <option value="State Y">State Y</option>
                  <option value="State Z">State Z</option>
                </select>
              </div>
            </div>
          </aside>
          <main className="flex-1 p-4">
            <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </main>
        </div>
        {/* Footer */}
        {/* <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Kisan Mitra. All rights reserved.</p>
          </div>
        </footer> */}
      </div>
    </div>
  )
}
