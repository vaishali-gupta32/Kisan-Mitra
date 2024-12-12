'use client'

import { useState } from 'react'
import { CropListing } from '../types'

export default function ListingCard({ listing }: { listing: CropListing }) {
  const [showInterestForm, setShowInterestForm] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [expectedPrice, setExpectedPrice] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would be an API call
    console.log('Submitting interest:', { listingId: listing.id, mobileNumber, expectedPrice })
    // Reset form and hide it
    setMobileNumber('')
    setExpectedPrice('')
    setShowInterestForm(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{listing.cropName}</h2>
      <p>Quantity: {listing.quantity} {listing.unit}</p>
      <p>Price: ${listing.price}</p>
      {!showInterestForm ? (
        <button
          onClick={() => setShowInterestForm(true)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Show Interest
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            value={expectedPrice}
            onChange={(e) => setExpectedPrice(e.target.value)}
            placeholder="Expected Price"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Interest
          </button>
        </form>
      )}
    </div>
  )
}

