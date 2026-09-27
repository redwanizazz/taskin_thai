export const facilityCaptions = [
  'Storefront signage', 'Warehouse stock', 'Cold storage shelving', 'Cold room stock',
  'Warehouse pallets', 'Refrigerated container fleet', 'Beverage stock pallets', 'Beverage warehouse stock',
  "Director's office", 'Shared administration office', 'Admin workstation',
  'Admin desk', 'Filing & records office', 'Team office space',
  'Retail storefront', 'Warehouse aisle stock', 'Retail beverage fridge', 'Onion & produce storage',
  'Retail storefront (second premise)', 'Retail beverage & stock', 'Warehouse aisle shelving', 'Warehouse goods storage',
];

export const facilityImages = Array.from({ length: 22 }, (_, i) => ({
  src: `/images/facility-${i + 1}.jpg`,
  alt: facilityCaptions[i] || 'Our facilities',
  caption: facilityCaptions[i] || 'Our facilities',
}));

export const facilityStats = [
  { value: '3', label: 'Warehouse & Retail Sites' },
  { value: '24/7', label: 'Cold Storage Chillers' },
  { value: '10+', label: 'Refrigerated Lorries & Containers' },
  { value: '15+', label: 'Team Members On Ground' },
];
