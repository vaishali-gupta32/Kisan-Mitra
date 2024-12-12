export interface CropListing {
    id: number
    cropName: string
    quantity: number
    unit: string
    price: number
    farmerDistrict: string  // Added missing property
    farmerState: string     // Added missing property
  }
  

export interface Interest {
  id: number
  listingId: number
  cropName: string
  status: 'pending' | 'accepted' | 'rejected'
}

export interface Contract {
  id: number
  listingId: number
  cropName: string
  quantity: number
  unit: string
  price: number
  status: 'pending' | 'finalized'
}

