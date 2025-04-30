import { lagosZoneMapping } from "./lagosLocations";
// Helper function to determine zone from address
export function determineZoneFromArea(area) {
  // Convert area to title case for consistency
  const formattedArea = area
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Look for exact match first
  for (const [zoneKey, zoneData] of Object.entries(lagosZoneMapping)) {
    if (zoneData.areas.includes(formattedArea)) {
      return {
        zoneId: zoneKey,
        zoneName: zoneData.zoneName,
        deliveryFee: zoneData.deliveryFee,
      };
    }
  }

  // Look for partial match if no exact match
  for (const [zoneKey, zoneData] of Object.entries(lagosZoneMapping)) {
    for (const listedArea of zoneData.areas) {
      if (
        formattedArea.includes(listedArea) ||
        listedArea.includes(formattedArea)
      ) {
        return {
          zoneId: zoneKey,
          zoneName: zoneData.zoneName,
          deliveryFee: zoneData.deliveryFee,
        };
      }
    }
  }

  // Default to Zone 5 if no match found
  return {
    zoneId: "Zone 5",
    zoneName: lagosZoneMapping["Zone 5"].zoneName,
    deliveryFee: lagosZoneMapping["Zone 5"].deliveryFee,
  };
}

// Helper function to search for an area and get suggestions
export function searchAreas(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return [];

  const results = [];

  for (const [zoneKey, zoneData] of Object.entries(lagosZoneMapping)) {
    for (const area of zoneData.areas) {
      if (area.toLowerCase().includes(term)) {
        results.push({
          area,
          zoneId: zoneKey,
          zoneName: zoneData.zoneName,
          deliveryFee: zoneData.deliveryFee,
        });
      }
    }
  }

  // Sort results by relevance (exact matches first)
  results.sort((a, b) => {
    const aIsExact = a.area.toLowerCase() === term;
    const bIsExact = b.area.toLowerCase() === term;

    if (aIsExact && !bIsExact) return -1;
    if (!aIsExact && bIsExact) return 1;

    const aStartsWith = a.area.toLowerCase().startsWith(term);
    const bStartsWith = b.area.toLowerCase().startsWith(term);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    return a.area.localeCompare(b.area);
  });

  return results;
}

// Get all zones with their fees
export function getAllZones() {
  return Object.entries(lagosZoneMapping).map(([zoneKey, zoneData]) => ({
    zoneId: zoneKey,
    zoneName: zoneData.zoneName,
    deliveryFee: zoneData.deliveryFee,
  }));
}
