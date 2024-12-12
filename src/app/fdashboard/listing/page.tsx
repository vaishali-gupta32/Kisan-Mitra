'use client'

import { useState, useEffect } from 'react'
import { Listing, Bid } from '@/app/fdashboard/listing/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FarmerDashboard() {
  const [listings, setListings] = useState<Listing[]>([])  // Empty initially
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null)
  const [showContractDialog, setShowContractDialog] = useState(false)
  const [contractDetails, setContractDetails] = useState({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)  // Store email here

  // Use useEffect to safely access localStorage on the client-side
  useEffect(() => {
    const storedEmail = localStorage.getItem("email")
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      setError('No email found in localStorage')
    }
  }, [])

  useEffect(() => {
    if (email) {
      const fetchListings = async () => {
        try {
          const response = await fetch(`http://172.22.25.168:8001/a/${email}`)
          if (!response.ok) {
            throw new Error('Failed to fetch listings')
          }
          const data: Listing[] = await response.json()
          setListings(data)
        } catch (error) {
          // setError('Error fetching listings: ' + error.message)
          console.log("error")
        } finally {
          setLoading(false)
        }
      }

      fetchListings()
    }
  }, [email])

  const handleStatusChange = (listingId: string, bidIndex: number, newStatus: Bid['status']) => {
    setListings(currentListings =>
      currentListings.map(listing =>
        listing._id === listingId
          ? {
              ...listing,
              bids: listing.bids.map((bid, index) =>
                index === bidIndex ? { ...bid, status: newStatus } : bid
              )
            }
          : listing
      )
    )

    if (newStatus === 'accepted') {
      const listing = listings.find(l => l._id === listingId)
      const bid = listing?.bids[bidIndex]
      if (bid) {
        setSelectedBid(bid)
        setShowContractDialog(true)
      }
    }
  }

  const handleContractSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contract details:', { ...contractDetails, bid: selectedBid })
    setShowContractDialog(false)
    setContractDetails({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer's Dashboard</h1>
      {listings.length === 0 ? (
        <div>No listings available</div>
      ) : (
        listings.map(listing => (
          <Card key={listing._id} className="mb-6">
            <CardHeader>
              <CardTitle>{listing.croptype}</CardTitle>
              <CardDescription>
                Quantity: {listing.quantity} | Price: ₹{listing.price}/unit
              </CardDescription>
            </CardHeader>
            <CardContent>
  <p>Cropping Time: {listing.croppingtime}</p>
  <p>Harvesting Time: {listing.harvestingtime}</p>
  <p>Location: {listing.fcity}, {listing.fstate} - {listing.fpincode}</p>
  <h3 className="font-semibold mt-4 mb-2">Bids:</h3>
  {Array.isArray(listing.bids) && listing.bids.length > 0 ? (
    listing.bids.map((bid, index) => (
      <Card key={index} className="mb-2">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p><strong>{bid.buyerName}</strong></p>
              <p>Offered: ₹{bid.cropPrice} for {listing.quantity} units</p>
            </div>
            <Badge>{bid.status}</Badge>
          </div>
          {bid.status === 'pending' && (
            <div className="flex justify-end mt-2 space-x-2">
              <Button onClick={() => handleStatusChange(listing._id, index, 'rejected')} variant="destructive">Reject</Button>
              <Button onClick={() => handleStatusChange(listing._id, index, 'negotiating')}>Negotiate</Button>
              <Button onClick={() => handleStatusChange(listing._id, index, 'accepted')}>Accept</Button>
            </div>
          )}
          {bid.status === 'negotiating' && (
            <div className="mt-2">
              <p className="mb-2">Buyer's phone: {bid.bmobile}</p>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => handleStatusChange(listing._id, index, 'rejected')} variant="destructive">Reject</Button>
                <Button onClick={() => handleStatusChange(listing._id, index, 'accepted')}>Accept</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    ))
  ) : (
    <p>No bids available</p>
  )}
</CardContent>

          </Card>
        ))
      )}

      <Dialog open={showContractDialog} onOpenChange={setShowContractDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Contract</DialogTitle>
            <DialogDescription>
              Fill in the details for the contract with {selectedBid?.buyerName}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContractSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deliveryDate" className="text-right">
                  Delivery Date
                </Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  className="col-span-3"
                  value={contractDetails.deliveryDate}
                  onChange={(e) => setContractDetails({...contractDetails, deliveryDate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentTerms" className="text-right">
                  Payment Terms
                </Label>
                <Input
                  id="paymentTerms"
                  className="col-span-3"
                  value={contractDetails.paymentTerms}
                  onChange={(e) => setContractDetails({...contractDetails, paymentTerms: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="additionalNotes" className="text-right">
                  Additional Notes
                </Label>
                <Textarea
                  id="additionalNotes"
                  className="col-span-3"
                  value={contractDetails.additionalNotes}
                  onChange={(e) => setContractDetails({...contractDetails, additionalNotes: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Contract</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
