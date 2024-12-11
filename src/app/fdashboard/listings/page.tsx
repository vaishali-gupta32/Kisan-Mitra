'use client'

import { useState } from 'react'
import { Listing, InterestForm, mockListings, mockInterestForms } from './mockData'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FarmerDashboard() {
  const [listings, setListings] = useState<Listing[]>(mockListings)
  const [interestForms, setInterestForms] = useState<InterestForm[]>(mockInterestForms)
  const [selectedInterest, setSelectedInterest] = useState<InterestForm | null>(null)
  const [showContractDialog, setShowContractDialog] = useState(false)
  const [contractDetails, setContractDetails] = useState({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })

  const handleStatusChange = (interestId: string, newStatus: InterestForm['status']) => {
    setInterestForms(forms =>
      forms.map(form =>
        form.id === interestId ? { ...form, status: newStatus } : form
      )
    )

    if (newStatus === 'accepted') {
      const interest = interestForms.find(form => form.id === interestId)
      if (interest) {
        setSelectedInterest(interest)
        setShowContractDialog(true)
      }
    }
  }

  const handleContractSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the contract details to the backend
    console.log('Contract details:', contractDetails)
    setShowContractDialog(false)
    // Reset contract details
    setContractDetails({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer's Dashboard</h1>
      {listings.map(listing => (
        <Card key={listing.id} className="mb-6">
          <CardHeader>
            <CardTitle>{listing.title}</CardTitle>
            <CardDescription>{listing.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Price: ${listing.price}/{listing.unit}</p>
            <p>Quantity: {listing.quantity} {listing.unit}</p>
            <h3 className="font-semibold mt-4 mb-2">Interest Forms:</h3>
            {interestForms.filter(form => form.listingId === listing.id).map(form => (
              <Card key={form.id} className="mb-2">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>{form.buyerName}</strong></p>
                      <p>Offered: ${form.offeredPrice}/{listing.unit} for {form.quantity} {listing.unit}</p>
                    </div>
                    <Badge>{form.status}</Badge>
                  </div>
                  {form.status === 'pending' && (
                    <div className="flex justify-end mt-2 space-x-2">
                      <Button onClick={() => handleStatusChange(form.id, 'rejected')} variant="destructive">Reject</Button>
                      <Button onClick={() => handleStatusChange(form.id, 'negotiating')}>Negotiate</Button>
                      <Button onClick={() => handleStatusChange(form.id, 'accepted')}>Accept</Button>
                    </div>
                  )}
                  {form.status === 'negotiating' && (
                    <p className="mt-2">Buyer's phone: {form.buyerPhone}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}

      <Dialog open={showContractDialog} onOpenChange={setShowContractDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Contract</DialogTitle>
            <DialogDescription>
              Fill in the details for the contract with {selectedInterest?.buyerName}.
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

