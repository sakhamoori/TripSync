import { lookupTime } from './TravelTimeBanner'

const HOME = { lat: 37.7749, lon: -122.4194 } // San Francisco as default origin

const COORDS: Record<string, { lat: number; lon: number }> = {
  paris: { lat: 48.8566, lon: 2.3522 },
  france: { lat: 46.6034, lon: 1.8883 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  japan: { lat: 36.2048, lon: 138.2529 },
  kyoto: { lat: 35.0116, lon: 135.7681 },
  osaka: { lat: 34.6937, lon: 135.5023 },
  london: { lat: 51.5074, lon: -0.1278 },
  rome: { lat: 41.9028, lon: 12.4964 },
  italy: { lat: 41.8719, lon: 12.5674 },
  bali: { lat: -8.3405, lon: 115.092 },
  bangkok: { lat: 13.7563, lon: 100.5018 },
  thailand: { lat: 15.87, lon: 100.9925 },
  sydney: { lat: -33.8688, lon: 151.2093 },
  australia: { lat: -25.2744, lon: 133.7751 },
  dubai: { lat: 25.2048, lon: 55.2708 },
  'cape town': { lat: -33.9249, lon: 18.4241 },
  reykjavik: { lat: 64.1466, lon: -21.9426 },
  iceland: { lat: 64.9631, lon: -19.0208 },
  'new york': { lat: 40.7128, lon: -74.006 },
  nyc: { lat: 40.7128, lon: -74.006 },
  'mexico city': { lat: 19.4326, lon: -99.1332 },
  mexico: { lat: 23.6345, lon: -102.5528 },
  cancun: { lat: 21.1619, lon: -86.8515 },
  barcelona: { lat: 41.3874, lon: 2.1686 },
  spain: { lat: 40.4637, lon: -3.7492 },
  amsterdam: { lat: 52.3676, lon: 4.9041 },
  berlin: { lat: 52.52, lon: 13.405 },
  germany: { lat: 51.1657, lon: 10.4515 },
  singapore: { lat: 1.3521, lon: 103.8198 },
  seoul: { lat: 37.5665, lon: 126.978 },
  korea: { lat: 35.9078, lon: 127.7669 },
  hawaii: { lat: 19.8968, lon: -155.5828 },
  'los angeles': { lat: 34.0522, lon: -118.2437 },
  'san francisco': { lat: 37.7749, lon: -122.4194 },
  miami: { lat: 25.7617, lon: -80.1918 },
  cairo: { lat: 30.0444, lon: 31.2357 },
  egypt: { lat: 26.8206, lon: 30.8025 },
  istanbul: { lat: 41.0082, lon: 28.9784 },
  turkey: { lat: 38.9637, lon: 35.2433 },
  lisbon: { lat: 38.7223, lon: -9.1393 },
  portugal: { lat: 39.3999, lon: -8.2245 },
  'salt lake city': { lat: 40.7608, lon: -111.891 },
  utah: { lat: 39.321, lon: -111.0937 },
  chicago: { lat: 41.8781, lon: -87.6298 },
  seattle: { lat: 47.6062, lon: -122.3321 },
  denver: { lat: 39.7392, lon: -104.9903 },
  'las vegas': { lat: 36.1699, lon: -115.1398 },
  boston: { lat: 42.3601, lon: -71.0589 },
  toronto: { lat: 43.6532, lon: -79.3832 },
  vancouver: { lat: 49.2827, lon: -123.1207 },
  'hong kong': { lat: 22.3193, lon: 114.1694 },
  mumbai: { lat: 19.076, lon: 72.8777 },
  india: { lat: 20.5937, lon: 78.9629 },
  delhi: { lat: 28.7041, lon: 77.1025 },
  'buenos aires': { lat: -34.6037, lon: -58.3816 },
  argentina: { lat: -38.4161, lon: -63.6167 },
  'rio de janeiro': { lat: -22.9068, lon: -43.1729 },
  brazil: { lat: -14.235, lon: -51.9253 },
  nairobi: { lat: -1.2921, lon: 36.8219 },
  kenya: { lat: -0.0236, lon: 37.9062 },
  marrakech: { lat: 31.6295, lon: -7.9811 },
  morocco: { lat: 31.7917, lon: -7.0926 },
  athens: { lat: 37.9838, lon: 23.7275 },
  greece: { lat: 39.0742, lon: 21.8243 },
  prague: { lat: 50.0755, lon: 14.4378 },
  vienna: { lat: 48.2082, lon: 16.3738 },
  zurich: { lat: 47.3769, lon: 8.5417 },
  switzerland: { lat: 46.8182, lon: 8.2275 },
  santorini: { lat: 36.3932, lon: 25.4615 },
  'grand canyon': { lat: 36.1069, lon: -112.1129 },
  arizona: { lat: 34.0489, lon: -111.0937 },
  banff: { lat: 51.1784, lon: -115.5708 },
  alberta: { lat: 53.9333, lon: -116.5765 },
  'chichen itza': { lat: 20.6843, lon: -88.5678 },
  'machu picchu': { lat: -13.1631, lon: -72.545 },
  peru: { lat: -9.19, lon: -75.0152 },
  cusco: { lat: -13.532, lon: -71.9675 },
  'great wall': { lat: 40.4319, lon: 116.5704 },
  china: { lat: 35.8617, lon: 104.1954 },
  beijing: { lat: 39.9042, lon: 116.4074 },
  'mount fuji': { lat: 35.3606, lon: 138.7274 },
  'taj mahal': { lat: 27.1751, lon: 78.0421 },
  agra: { lat: 27.1767, lon: 78.0081 },
  'ha long bay': { lat: 20.9101, lon: 107.1839 },
  vietnam: { lat: 14.0583, lon: 108.2772 },
  hanoi: { lat: 21.0278, lon: 105.8342 },
  'pyramids of giza': { lat: 29.9792, lon: 31.1342 },
  giza: { lat: 29.9792, lon: 31.1342 },
  serengeti: { lat: -2.3333, lon: 34.8333 },
  tanzania: { lat: -6.369, lon: 34.8888 },
  'czech republic': { lat: 49.8175, lon: 15.473 },
  austria: { lat: 47.5162, lon: 14.5501 },
  edinburgh: { lat: 55.9533, lon: -3.1883 },
  scotland: { lat: 56.4907, lon: -4.2026 },
  budapest: { lat: 47.4979, lon: 19.0402 },
  hungary: { lat: 47.1625, lon: 19.5033 },
  dubrovnik: { lat: 42.6507, lon: 18.0944 },
  croatia: { lat: 45.1, lon: 15.2 },
  florence: { lat: 43.7696, lon: 11.2558 },
  venice: { lat: 45.4408, lon: 12.3155 },
  copenhagen: { lat: 55.6761, lon: 12.5683 },
  denmark: { lat: 56.2639, lon: 9.5018 },
  'amalfi coast': { lat: 40.634, lon: 14.6027 },
  amalfi: { lat: 40.634, lon: 14.6027 },
  positano: { lat: 40.6281, lon: 14.4849 },
  munich: { lat: 48.1351, lon: 11.582 },
  phuket: { lat: 7.8804, lon: 98.3923 },
  'angkor wat': { lat: 13.4125, lon: 103.867 },
  cambodia: { lat: 12.5657, lon: 104.991 },
  'siem reap': { lat: 13.3671, lon: 103.8448 },
  kathmandu: { lat: 27.7172, lon: 85.324 },
  nepal: { lat: 28.3949, lon: 84.124 },
  jaipur: { lat: 26.9124, lon: 75.7873 },
  shanghai: { lat: 31.2304, lon: 121.4737 },
  maldives: { lat: 3.2028, lon: 73.2207 },
  petra: { lat: 30.3285, lon: 35.4444 },
  jordan: { lat: 30.5852, lon: 36.2384 },
  jerusalem: { lat: 31.7683, lon: 35.2137 },
  israel: { lat: 31.0461, lon: 34.8516 },
  'washington dc': { lat: 38.9072, lon: -77.0369 },
  'new orleans': { lat: 29.9511, lon: -90.0715 },
  yellowstone: { lat: 44.428, lon: -110.5885 },
  'niagara falls': { lat: 43.0962, lon: -79.0377 },
  honolulu: { lat: 21.3069, lon: -157.8583 },
  queenstown: { lat: -45.0312, lon: 168.6626 },
  'new zealand': { lat: -40.9006, lon: 174.886 },
  'great barrier reef': { lat: -18.2871, lon: 147.6992 },
  cairns: { lat: -16.9186, lon: 145.7781 },
  'bora bora': { lat: -16.5004, lon: -151.7415 },
  'french polynesia': { lat: -17.6797, lon: -149.4068 },
  fiji: { lat: -17.7134, lon: 178.065 },
  havana: { lat: 23.1136, lon: -82.3666 },
  cuba: { lat: 21.5218, lon: -77.7812 },
  'st lucia': { lat: 13.9094, lon: -60.9789 },
  'saint lucia': { lat: 13.9094, lon: -60.9789 },
  cartagena: { lat: 10.3932, lon: -75.5142 },
  colombia: { lat: 4.5709, lon: -74.2973 },
  galapagos: { lat: -0.9538, lon: -90.9656 },
  ecuador: { lat: -1.8312, lon: -78.1834 },
  lima: { lat: -12.0464, lon: -77.0428 },
  patagonia: { lat: -41.8101, lon: -68.9063 },
  'victoria falls': { lat: -17.9243, lon: 25.8572 },
  zimbabwe: { lat: -19.0154, lon: 29.1549 },
  zambia: { lat: -13.1339, lon: 27.8493 },
  zanzibar: { lat: -6.1659, lon: 39.1989 },
}

function lookupCoords(destination: string): { lat: number; lon: number } | null {
  if (!destination || destination.trim().length < 2) return null
  const lower = destination.toLowerCase()
  for (const [key, val] of Object.entries(COORDS)) {
    if (lower.includes(key)) return val
  }
  return null
}

function haversineKm(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)}m`
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

interface TransportMode {
  label: string
  speedKmh: number
  icon: string
  maxKm: number
}

const MODES: TransportMode[] = [
  { label: 'Walking', speedKmh: 5, icon: 'walk', maxKm: 80 },
  { label: 'Biking', speedKmh: 20, icon: 'bike', maxKm: 300 },
  { label: 'Train', speedKmh: 150, icon: 'train', maxKm: 12000 },
  { label: 'Flight', speedKmh: 850, icon: 'flight', maxKm: Infinity },
]

function TransportBar({ destination, coords }: { destination: string; coords: { lat: number; lon: number } }) {
  const distKm = haversineKm(HOME.lat, HOME.lon, coords.lat, coords.lon)
  const flightTime = lookupTime(destination)

  return (
    <div className="transport-bar">
      {MODES.map((mode) => {
        const reachable = distKm <= mode.maxKm
        let time: string

        if (mode.icon === 'flight' && flightTime) {
          time = flightTime.flight
        } else if (reachable) {
          const roadDist = mode.icon === 'flight' ? distKm : distKm * 1.3
          time = formatDuration(roadDist / mode.speedKmh)
        } else {
          time = '--'
        }

        return (
          <div
            key={mode.icon}
            className={`transport-mode ${!reachable && mode.icon !== 'flight' ? 'transport-na' : ''}`}
          >
            <div className={`transport-icon transport-icon-${mode.icon}`} />
            <div className="transport-label">{mode.label}</div>
            <div className="transport-time">{time}</div>
          </div>
        )
      })}
      <div className="transport-distance">
        {Math.round(distKm * 0.621371).toLocaleString()} mi
      </div>
    </div>
  )
}

export function DestinationMap({ destination }: { destination: string }) {
  const coords = lookupCoords(destination)
  if (!coords) return null

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.15}%2C${coords.lat - 0.1}%2C${coords.lon + 0.15}%2C${coords.lat + 0.1}&layer=mapnik&marker=${coords.lat}%2C${coords.lon}`

  return (
    <div className="destination-map">
      <div className="destination-map-header">
        <span>{destination}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
        >
          Open in Google Maps
        </a>
      </div>
      <div className="destination-map-frame">
        <iframe
          title={`Map of ${destination}`}
          src={src}
          style={{ border: 0, width: '100%', height: '100%' }}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <TransportBar destination={destination} coords={coords} />
    </div>
  )
}
