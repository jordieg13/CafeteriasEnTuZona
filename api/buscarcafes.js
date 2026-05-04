export default async function handler(req, res) {
  const origin = req.headers.origin || req.headers.referer || '';
  const allowed = process.env.ALLOWED_ORIGIN; // ej: "https://tu-app.vercel.app"
  
  if (allowed && !origin.includes(allowed)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { lat, lng } = req.query;

  if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing lat/lng parameters' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&key=${process.env.API_KEY}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
  } catch (e) {
      console.error("Error fetching Places API:", e);
      res.status(500).json({ error: 'Error fetching cafes' });
  }
}