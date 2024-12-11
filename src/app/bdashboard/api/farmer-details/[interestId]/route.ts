import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { interestId: string } }
) {
  const interestId = params.interestId

  // In a real application, you would fetch this data from your database
  const mockFarmerDetails = {
    name: 'John Doe',
    location: 'Maharashtra, India',
    crop: 'Wheat',
    quantity: 1000,
    unit: 'kg',
    price: 25,
    expectedDelivery: '2023-08-15',
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return NextResponse.json(mockFarmerDetails)
}

