'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, List, AlertTriangle, Sprout, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { PageBackground } from '@/components/PageBackground'

console.log("Hii");

const weatherAlert = {
  type: 'Heavy Rainfall',
  description: 'Expected heavy rainfall in your area over the next 48 hours.',
  advice: 'Consider protecting sensitive crops and ensuring proper drainage.',
}

export default function DashboardPage() {
  const [listings, setListings] = useState<any[]>([]) // Ensure listings is always an array
  const [loading, setLoading] = useState(true) // Track the loading state for the API request
  const [error, setError] = useState<string | null>(null) // Handle errors

  // Fetch listings from the API
  useEffect(() => {
    const fetchListings = async () => { 
      const email = localStorage.getItem('email') // Get email from localStorage (ensure it's available)
      console.log("Email retrieved from localStorage:", email);
      
      if (email) {
        try {
          console.log("API call started...");
          setLoading(true) // Set loading to true when the API call starts
          const response = await fetch(`http://172.22.25.168:8001/a/${email}`)
          console.log(response);
          
          if (!response.ok) {
            throw new Error('Failed to fetch listings')
          }

          const data = await response.json()
          console.log("API response data:", data); // Log response data
          
          // Ensure the data is an array before setting it to state
          if (Array.isArray(data)) {
            setListings(data)
          } else {
            console.error("Expected data to be an array, but got:", data);
            setError('Error: Data is not in the expected format');
          }

        } catch (error: any) {
          if (error instanceof Error) {
            console.error("Error fetching listings:", error.message);  // Now TypeScript knows 'error' has a 'message' property
            setError(error.message);  // Set the error message
          } else {
            console.error("Unknown error:", error);  // Handle unexpected error types
            setError("An unexpected error occurred");
          }
        } finally {
          setLoading(false) // Set loading to false when the request is finished
          console.log("API call finished.");
        }
      } else {
        console.log("No email found in localStorage.");
        setLoading(false);
      }
    }

    fetchListings()
  }, []) // Empty dependency array ensures this runs only once on component mount

  return (
    <DashboardLayout>
      <PageBackground imageSrc="/resources/.jpeg" />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Welcome, Farmer!</h1>
          <Button asChild>
            <Link href="/fdashboard/listings/new">Create New Listing</Link>
          </Button>
        </div>

        {weatherAlert && (
          <Card className="bg-yellow-100 dark:bg-yellow-900">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Cloud className="mr-2 h-4 w-4" />
                Weather Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{weatherAlert.type}</p>
              <p className="text-sm mt-1">{weatherAlert.description}</p>
              <p className="text-sm mt-1 font-medium">{weatherAlert.advice}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <List className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+3 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Negotiations</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Requires your attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crop Health Index</CardTitle>
              <Sprout className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Based on recent assessments</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Listings</h2>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {listings.length > 0 ? (
                listings.map((listing: any) => {
                  console.log(listing); // Log each listing to ensure it's correct
                  return (
                    <Card key={listing.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          {listing.croptype}
                          <Badge variant={getStatusVariant(listing.status)}>{listing.status}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2"><strong>Quantity:</strong> {listing.quantity}</p>
                        <p className="mb-2"><strong>Price:</strong> {listing.price}</p>
                        <div className="flex justify-between items-center mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/listings/${listing.id}`}>View Details</Link>
                          </Button>
                          {listing.status === 'Pending' && (
                            <Button size="sm">
                              Review Offers
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <p>No listings available</p>
              )}
            </div>
          )}

          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href="/fdashboard/listings">View All Listings</Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Pending':
      return 'warning'
    default:
      return 'secondary'
  }
}
