'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PageBackground } from '@/components/PageBackground'

export default function NewListingPage() {
  const router = useRouter()
  const [listing, setListing] = useState({
    croptype: '',
    quantity: '',
    croppingtime: '',
    harvestingtime: '',
    price: '',
    fcity: '',
    fpincode: '',
    fstate: '',
    email: '',  // Added email field
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListing({ ...listing, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setListing({ ...listing, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email validation (you can improve this)
    if (!listing.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      console.error('Invalid email address')
      return
    }

    try {
      const response = await fetch('/api/listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
      })

      if (response.ok) {
        // Redirect to the Farmer Dashboard after successful submission
        router.push('/fdashboard')
      } else {
        console.error('Failed to submit listing')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <DashboardLayout>
      <PageBackground imageSrc="/new-listing-background.jpg" />
      <Card>
        <CardHeader>
          <CardTitle>Add New Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="croptype">Crop Type</label>
              <Input id="croptype" name="croptype" value={listing.croptype} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <Input id="quantity" name="quantity" value={listing.quantity} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="croppingtime">Cropping Time</label>
              <Select onValueChange={(value: string) => handleSelectChange('croppingtime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cropping time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                  <SelectItem value="November">November</SelectItem>
                  <SelectItem value="December">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="harvestingtime">Harvesting Time</label>
              <Select onValueChange={(value: string) => handleSelectChange('harvestingtime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select harvesting time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                  <SelectItem value="November">November</SelectItem>
                  <SelectItem value="December">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="price">Price (in ₹)</label>
              <Input id="price" name="price" type="number" value={listing.price} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="fcity">City</label>
              <Input id="fcity" name="fcity" value={listing.fcity} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="fpincode">Pincode</label>
              <Input id="fpincode" name="fpincode" value={listing.fpincode} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="fstate">State</label>
              <Input id="fstate" name="fstate" value={listing.fstate} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email">Email</label> {/* New email input field */}
              <Input id="email" name="email" type="email" value={listing.email} onChange={handleChange} required />
            </div>
            <Button type="submit">Create Listing</Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
