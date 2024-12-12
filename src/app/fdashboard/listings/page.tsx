// 'use client'

// import { useState } from 'react'
// import { Listing, InterestForm, mockListings, mockInterestForms } from './mockData'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"

// export default function FarmerDashboard() {
//   const [listings, setListings] = useState<Listing[]>(mockListings)
//   const [interestForms, setInterestForms] = useState<InterestForm[]>(mockInterestForms)
//   const [selectedInterest, setSelectedInterest] = useState<InterestForm | null>(null)
//   const [showContractDialog, setShowContractDialog] = useState(false)
//   const [contractDetails, setContractDetails] = useState({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })

//   const handleStatusChange = (interestId: string, newStatus: InterestForm['status']) => {
//     setInterestForms(forms =>
//       forms.map(form =>
//         form.id === interestId ? { ...form, status: newStatus } : form
//       )
//     )

//     if (newStatus === 'accepted') {
//       const interest = interestForms.find(form => form.id === interestId)
//       if (interest) {
//         setSelectedInterest(interest)
//         setShowContractDialog(true)
//       }
//     }
//   }

//   const handleContractSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Here you would typically send the contract details to the backend
//     console.log('Contract details:', contractDetails)
//     setShowContractDialog(false)
//     // Reset contract details
//     setContractDetails({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Farmer's Dashboard</h1>
//       {listings.map(listing => (
//         <Card key={listing.id} className="mb-6">
//           <CardHeader>
//             <CardTitle>{listing.title}</CardTitle>
//             <CardDescription>{listing.description}</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <p>Price: ${listing.price}/{listing.unit}</p>
//             <p>Quantity: {listing.quantity} {listing.unit}</p>
//             <h3 className="font-semibold mt-4 mb-2">Interest Forms:</h3>
//             {interestForms.filter(form => form.listingId === listing.id).map(form => (
//               <Card key={form.id} className="mb-2">
//                 <CardContent className="p-4">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p><strong>{form.buyerName}</strong></p>
//                       <p>Offered: ${form.offeredPrice}/{listing.unit} for {form.quantity} {listing.unit}</p>
//                     </div>
//                     <Badge>{form.status}</Badge>
//                   </div>
//                   {form.status === 'pending' && (
//                     <div className="flex justify-end mt-2 space-x-2">
//                       <Button onClick={() => handleStatusChange(form.id, 'rejected')} variant="destructive">Reject</Button>
//                       <Button onClick={() => handleStatusChange(form.id, 'negotiating')}>Negotiate</Button>
//                       <Button onClick={() => handleStatusChange(form.id, 'accepted')}>Accept</Button>
//                     </div>
//                   )}
//                   {form.status === 'negotiating' && (
//                     <p className="mt-2">Buyer's phone: {form.buyerPhone}</p>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </CardContent>
//         </Card>
//       ))}

//       <Dialog open={showContractDialog} onOpenChange={setShowContractDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create Contract</DialogTitle>
//             <DialogDescription>
//               Fill in the details for the contract with {selectedInterest?.buyerName}.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleContractSubmit}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="deliveryDate" className="text-right">
//                   Delivery Date
//                 </Label>
//                 <Input
//                   id="deliveryDate"
//                   type="date"
//                   className="col-span-3"
//                   value={contractDetails.deliveryDate}
//                   onChange={(e) => setContractDetails({...contractDetails, deliveryDate: e.target.value})}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="paymentTerms" className="text-right">
//                   Payment Terms
//                 </Label>
//                 <Input
//                   id="paymentTerms"
//                   className="col-span-3"
//                   value={contractDetails.paymentTerms}
//                   onChange={(e) => setContractDetails({...contractDetails, paymentTerms: e.target.value})}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="additionalNotes" className="text-right">
//                   Additional Notes
//                 </Label>
//                 <Textarea
//                   id="additionalNotes"
//                   className="col-span-3"
//                   value={contractDetails.additionalNotes}
//                   onChange={(e) => setContractDetails({...contractDetails, additionalNotes: e.target.value})}
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="submit">Send Contract</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { Listing, InterestForm } from './mockData'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Importing the localStorageService for fetching the user data
import { getUserData } from '@/app/fdashboard/flocalstorage'

export default function FarmerDashboard() {
  const [listings, setListings] = useState<Listing[]>([])
  const [interestForms, setInterestForms] = useState<InterestForm[]>([])
  const [selectedInterest, setSelectedInterest] = useState<InterestForm | null>(null)
  const [showContractDialog, setShowContractDialog] = useState(false)
  const [contractDetails, setContractDetails] = useState({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })
  const [email, setEmail] = useState<string>('') // Initialize email state
  const [isClient, setIsClient] = useState(false) // Track client-side rendering

  // Fetch data from the localStorageService when the component mounts
  useEffect(() => {
    setIsClient(true) // Mark that the component has mounted on the client

    // Retrieve user data (e.g., email) from localStorage
    const storedUserData = getUserData()
    if (storedUserData) {
      setEmail(storedUserData.email) // Use the stored email
    }
  }, [])

  // Fetch data from the backend when the email is available
  useEffect(() => {
    if (email) {
      fetch(`http://172.22.25.168:8003/a/${email}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming the response has the necessary structure
          const fetchedListings = data.map((listing: any) => ({
            id: listing._id.$oid,
            title: listing.croptype,
            description: `${listing.fcities} - ${listing.fstate}`,
            price: listing.price,
            unit: 'kg',
            quantity: listing.quantity,
          }))

          const fetchedInterestForms = data.map((listing: any) => listing.bids.map((bid: any) => ({
            id: bid._id.$oid,
            listingId: listing._id.$oid,
            buyerName: bid.buyerName,
            offeredPrice: bid.cropPrice,
            quantity: bid.quantity,
            status: bid.status,
            buyerPhone: bid.bmobile,
          })))

          setListings(fetchedListings)
          setInterestForms(fetchedInterestForms.flat())
        })
        .catch((error) => console.error('Error fetching data:', error))
    }
  }, [email])

  const handleStatusChange = (interestId: string, newStatus: InterestForm['status']) => {
    // Update status locally
    setInterestForms(forms =>
      forms.map(form =>
        form.id === interestId ? { ...form, status: newStatus } : form
      )
    )

    // Update status in the backend
    const interest = interestForms.find(form => form.id === interestId)
    if (interest) {
      fetch(`http://172.22.25.168:8003/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interestId, status: newStatus }),
      })
        .then((response) => response.json())
        .then((data) => console.log('Status updated:', data))
        .catch((error) => console.error('Error updating status:', error))
    }

    // If accepted, open the contract dialog
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

    // Store contract details in precontract form collection
    if (selectedInterest) {
      const contractData = {
        interestId: selectedInterest.id,
        contractDetails,
        buyerName: selectedInterest.buyerName,
        buyerPhone: selectedInterest.buyerPhone,
        listingId: selectedInterest.listingId,
      }

      fetch('http://172.22.25.168:8003/precontract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Pre-contract saved:', data)
          setShowContractDialog(false)
          setContractDetails({ deliveryDate: '', paymentTerms: '', additionalNotes: '' })
        })
        .catch((error) => console.error('Error storing pre-contract:', error))
    }
  }

  // Wait until the component has mounted (client-side) before rendering the content
  if (!isClient) {
    return null; // Prevent SSR mismatch
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
