// import { DashboardLayout } from '@/components/dashboard-layout'
// import { Button } from '@/components/ui/button'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import Link from 'next/link'
// import { PageBackground } from '@/components/PageBackground'

// const listings = [
//   {
//     _id: "675724ccd5afa64ad90f6c27",
//     croptype: "Wheat",
//     quantity: "500 kg",
//     croppingtime: "Spring",
//     harvestingtime: "Summer",
//     price: 2500,
//     status: "active",
//     fName: "Rahul Singh",
//     farmerId: "675722f9d5afa64ad90f6c25",
//     fcity: "Pune",
//     fpincode: "411001",
//     fstate: "Maharashtra",
//     bids: [
//       {
//         cropPrice: 2600,
//         buyerId: "675723a4d5afa64ad90f6c26",
//         buyerName: "Agro Corp",
//         status: "pending"
//       }
//     ]
//   },
//   {
//     _id: "675724ccd5afa64ad90f6c28",
//     croptype: "Rice",
//     quantity: "1000 kg",
//     croppingtime: "Summer",
//     harvestingtime: "Fall",
//     price: 3000,
//     status: "pending",
//     fName: "Priya Patel",
//     farmerId: "675722f9d5afa64ad90f6c25",
//     fcity: "Ahmedabad",
//     fpincode: "380001",
//     fstate: "Gujarat",
//     bids: []
//   },
//   {
//     _id: "675724ccd5afa64ad90f6c29",
//     croptype: "Corn",
//     quantity: "750 kg",
//     croppingtime: "Spring",
//     harvestingtime: "Summer",
//     price: 1500,
//     status: "active",
//     fName: "Amit Kumar",
//     farmerId: "675722f9d5afa64ad90f6c25",
//     fcity: "Bangalore",
//     fpincode: "560001",
//     fstate: "Karnataka",
//     bids: [
//       {
//         cropPrice: 1550,
//         buyerId: "675723a4d5afa64ad90f6c27",
//         buyerName: "FreshFoods Ltd",
//         status: "accepted"
//       }
//     ]
//   },
//   {
//     _id: "675724ccd5afa64ad90f6c30",
//     croptype: "Soybeans",
//     quantity: "300 kg",
//     croppingtime: "Summer",
//     harvestingtime: "Fall",
//     price: 4000,
//     status: "active",
//     fName: "Sneha Reddy",
//     farmerId: "675722f9d5afa64ad90f6c25",
//     fcity: "Hyderabad",
//     fpincode: "500001",
//     fstate: "Telangana",
//     bids: []
//   },
//   {
//     _id: "675724ccd5afa64ad90f6c31",
//     croptype: "Tomatoes",
//     quantity: "200 kg",
//     croppingtime: "Spring",
//     harvestingtime: "Summer",
//     price: 2500,
//     status: "pending",
//     fName: "Vikram Singh",
//     farmerId: "675722f9d5afa64ad90f6c25",
//     fcity: "Jaipur",
//     fpincode: "302001",
//     fstate: "Rajasthan",
//     bids: [
//       {
//         cropPrice: 2600,
//         buyerId: "675723a4d5afa64ad90f6c28",
//         buyerName: "Green Grocers",
//         status: "pending"
//       }
//     ]
//   }
// ]

// export default function ListingsPage() {
//   return (
//     <DashboardLayout>
//       <PageBackground imageSrc="/listings-background.jpg" />
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">My Listings</h1>
//         <Button asChild>
//           <Link href="/dashboard/listings/new">Add New Listing</Link>
//         </Button>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Active and Pending Listings</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Crop</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Location</TableHead>
//                 <TableHead>Bids</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {listings.map((listing) => (
//                 <TableRow key={listing._id}>
//                   <TableCell className="font-medium">{listing.croptype}</TableCell>
//                   <TableCell>{listing.quantity}</TableCell>
//                   <TableCell>₹{listing.price}</TableCell>
//                   <TableCell>
//                     <Badge variant={listing.status === 'active' ? 'success' : 'warning'}>
//                       {listing.status === 'active' ? 'Active' : 'Pending'}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>{`${listing.fcity}, ${listing.fstate}`}</TableCell>
//                   <TableCell>{listing.bids.length}</TableCell>
//                   <TableCell>
//                     <div className="flex space-x-2">
//                       <Button variant="outline" size="sm" asChild>
//                         <Link href={`/dashboard/listings/${listing._id}`}>View</Link>
//                       </Button>
//                       <Button variant="outline" size="sm" asChild>
//                         <Link href={`/dashboard/listings/${listing._id}/edit`}>Edit</Link>
//                       </Button>
//                       {listing.bids.length > 0 && (
//                         <Button variant="outline" size="sm" asChild>
//                           <Link href={`/dashboard/listings/${listing._id}/bids`}>Bids</Link>
//                         </Button>
//                       )}
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </DashboardLayout>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { PageBackground } from '@/components/PageBackground'

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([])  // Define state for listings
  const [loading, setLoading] = useState<boolean>(true) // State to track loading status
  const [error, setError] = useState<string | null>(null) // State to track error

  useEffect(() => {
    const fetchListings = async () => {
      const email = sessionStorage.getItem("email"); // Retrieve email from sessionStorage
      console.log(email);

      if (!email) {
        setError('User is not logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://172.22.25.168:8001/a/?email=${email}`); // Send email as query parameter
        
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <DashboardLayout>
      <PageBackground imageSrc="/listings-background.jpg" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Button asChild>
          <Link href="/dashboard/listings/new">Add New Listing</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active and Pending Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Bids</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing._id}>
                  <TableCell className="font-medium">{listing.croptype}</TableCell>
                  <TableCell>{listing.quantity}</TableCell>
                  <TableCell>₹{listing.price}</TableCell>
                  <TableCell>
                    <Badge variant={listing.status === 'active' ? 'success' : 'warning'}>
                      {listing.status === 'active' ? 'Active' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>{`${listing.fcity}, ${listing.fstate}`}</TableCell>
                  <TableCell>{listing.bids.length}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/fdashboard/listings/${listing._id}`}>View</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/fdashboard/listings/${listing._id}/edit`}>Edit</Link>
                      </Button>
                      {listing.bids.length > 0 && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/fdashboard/listings/${listing._id}/bids`}>Bids</Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
