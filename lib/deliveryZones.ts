type ZoneResult = {
  zone: string;
  areas: string;
  fee: string;
  miles: string;
};

// Home base: 33169 (Miami Gardens)
// Instead of listing individual zips (which always has gaps),
// use Sets for the local zone (specific neighbors) and
// range-based logic for everything else by county.

// Zone 1: Local — immediate neighbors of 33169
const localZips = new Set([
  // Miami Gardens / Opa-Locka / Carol City
  "33054", "33055", "33056", "33169", "33179",
  // North Miami / North Miami Beach / Aventura
  "33160", "33161", "33162", "33163", "33164", "33167", "33168", "33180", "33181",
  // Hialeah / Miami Lakes / Country Club
  "33010", "33012", "33013", "33014", "33015", "33016", "33017", "33018",
  // Miramar (just across county line)
  "33023", "33025", "33027", "33029",
]);

// Helper: check if a zip is in Broward County range
function isBroward(zip: number): boolean {
  // Broward zips: 33004-33099 range + 33301-33351 + 33441-33442
  return (
    (zip >= 33004 && zip <= 33099) ||
    (zip >= 33301 && zip <= 33351) ||
    (zip >= 33441 && zip <= 33442)
  );
}

// Helper: check if a zip is in Miami-Dade County range
function isMiamiDade(zip: number): boolean {
  // Miami-Dade zips: 33010-33299 (broad range covering all Miami-Dade)
  return zip >= 33010 && zip <= 33299;
}

// Helper: check if a zip is in Palm Beach County range
function isPalmBeach(zip: number): boolean {
  // Palm Beach zips: 33401-33499 range + some 334xx
  return zip >= 33401 && zip <= 33499;
}

// Far south / Keys
function isFarSouth(zip: number): boolean {
  // Homestead / Florida City / Keys
  return (
    (zip >= 33030 && zip <= 33039) ||
    (zip >= 33034 && zip <= 33037)
  );
}

export function lookupDeliveryZone(zip: string): ZoneResult | null {
  const trimmed = zip.trim();
  if (!/^\d{5}$/.test(trimmed)) return null;

  const zipNum = parseInt(trimmed, 10);

  // Zone 1: Local — within ~10 miles of 33169
  if (localZips.has(trimmed)) {
    return {
      zone: "Local Zone",
      areas: "Miami Gardens, Miramar, North Miami, Hialeah & neighbors",
      fee: "$40 flat",
      miles: "Within 10 miles",
    };
  }

  // Zone 4: Far South (check before general Miami-Dade)
  if (isFarSouth(zipNum)) {
    return {
      zone: "Far Zone",
      areas: "Homestead, Florida City, Key Largo & Keys",
      fee: "$120 flat",
      miles: "35+ miles",
    };
  }

  // Zone 2: Nearby Broward (not already caught by local)
  if (isBroward(zipNum)) {
    return {
      zone: "Nearby Zone",
      areas: "Fort Lauderdale, Hollywood, Pembroke Pines, Plantation & Broward",
      fee: "$60 flat",
      miles: "10–20 miles",
    };
  }

  // Zone 2: Nearby Miami-Dade core (not local, not far south)
  if (isMiamiDade(zipNum)) {
    // South Dade (Kendall, Cutler Bay, Palmetto Bay — farther out)
    if (zipNum >= 33155 && zipNum <= 33199) {
      return {
        zone: "Extended Zone",
        areas: "Kendall, Coral Gables, Pinecrest, South Miami",
        fee: "$85 flat",
        miles: "20–35 miles",
      };
    }
    // Rest of Miami-Dade is nearby
    return {
      zone: "Nearby Zone",
      areas: "Miami, Downtown, Doral, Little Havana & Miami-Dade",
      fee: "$60 flat",
      miles: "10–20 miles",
    };
  }

  // Zone 4: Palm Beach
  if (isPalmBeach(zipNum)) {
    return {
      zone: "Far Zone",
      areas: "Boca Raton, Delray Beach, West Palm Beach",
      fee: "$120 flat",
      miles: "35+ miles",
    };
  }

  // Anything else in 33xxx that we haven't caught
  if (zipNum >= 33000 && zipNum <= 33999) {
    return {
      zone: "Extended Zone",
      areas: "Greater South Florida",
      fee: "$85 flat",
      miles: "20–35 miles",
    };
  }

  return {
    zone: "Custom Zone",
    areas: "Outside South Florida — contact us to discuss",
    fee: "Contact us for a custom quote",
    miles: "Varies",
  };
}
